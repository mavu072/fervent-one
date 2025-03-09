from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.prompt_values import PromptValue, ChatPromptValue
from langchain_core.messages import BaseMessage, AIMessage
from langchain_core.documents import Document
from langchain_openai import ChatOpenAI
from langchain_chroma import Chroma
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain

from src.models.error import Error
from src.services.vectorstores.chroma import (
    chroma_retriever,
    chroma_client,
    aquery_vector_store,
)
from src.services.vectorstores.in_memory import aquery_in_memory_vector_store
from src.services.llm.prompt_templates import (
    QA_PROMPT_TEMPLATE,
    QA_CUSTOM_CONTEXT_PROMPT_TEMPLATE,
    CONTEXTUALISE_CHAT_HISTORY_PROMPT,
    SYSTEM_INSTRUCTION_PROMPT_V2 as SYSTEM_INSTRUCTION_PROMPT,
    COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE,
)
from src.services.vectorstores.search_utils import join_similarity_search_results
from src.utils.model_utils import parse_compliance_analysis
from src.utils.json_utils import extract_json_obj
from src.utils.exception_utils import ERR_ANALYSIS_FAILED, ERR_JSON_PARSER

import os
import asyncio
import time
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI()
db = chroma_client()
retriever = chroma_retriever()


def create_completion(prompt_val: PromptValue | str) -> AIMessage:
    """Creates a completion for a prompt value."""

    ai_message = llm.invoke(prompt_val)

    return ai_message


def create_prompt_response(query_text: str, context_text: str) -> AIMessage:
    """Creates a response to a message, using with the system's QA prompt."""

    # Creates prompt from a prompt template. Fill placeholders with input values and invokes llm.
    prompt_template = ChatPromptTemplate.from_template(QA_PROMPT_TEMPLATE)
    prompt = prompt_template.invoke({ "context": context_text, "input": query_text })
    response = llm.invoke(prompt)

    return response


async def create_conversational_response(
    query_message: str, message_history: list[tuple[str, str]], vectorstore: Chroma = None
) -> dict:
    """Creates a response to a message and uses the previous messages in the context.

        :param str query_message: String text.
        :param list[tuple[str, str]] message_history: List of previous messages.
        :param Chroma vectorstore: Vectorstore loaded into memory with a user's custom files.
    """

    if vectorstore == None:
        qa_prompt_template = QA_PROMPT_TEMPLATE
    else:
        qa_prompt_template = QA_CUSTOM_CONTEXT_PROMPT_TEMPLATE
    
    # QA_PROMPT: a prompt instructed to produce an answer based on the context and custom context.
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_INSTRUCTION_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", qa_prompt_template),
        ]
    )
    # CONTEXTUALISE_CHAT_HISTORY_PROMPT: a prompt instructed to produce a rephrased question based on the user's last question, but referencing previous messages.
    contextualize_history_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", CONTEXTUALISE_CHAT_HISTORY_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    # (chat history aware retriever)
    history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_history_prompt)
    # (documents chain): Adds Documents from vector search to context.
    documents_chain = create_stuff_documents_chain(llm, qa_prompt)
    # (retrieval chain): Runs the retrieval chain using the history aware retriever and documents chain.
    retrieval_chain = create_retrieval_chain(history_aware_retriever, documents_chain)

    timer_start = time.perf_counter()

    # (invoke): Fill placeholders with values and invoke retrieval chain.
    if vectorstore == None:
        response = await retrieval_chain.ainvoke({"input": query_message, "chat_history": message_history})
    else:
        docs = await aquery_vector_store(query=query_message, db=vectorstore, k=1)
        custom_context = list(map(lambda doc: doc.__getitem__(0), docs if docs != None else []))
        response = await retrieval_chain.ainvoke(
            {
                "input": query_message,
                "chat_history": message_history,
                "custom_context": custom_context,
            }
        )

    timer_stop = time.perf_counter()
    print(f"* Finished Retrieval Chain invoke in... {timer_stop - timer_start:0.4f} seconds")

    return response


async def create_compliance_analysis(articles: list[Document]) -> dict[str, list]:
    """Performs and creates a compliance analysis on a document.
    \n
        :param list[Document] articles: An article refers to clauses/sections in a document.
    """

    response = {"result": []}

    coroutines = list(map(pre_process_inputs, articles))
    print(f"Pre-process Coroutine tasks: {len(coroutines)}")

    timer_start = time.perf_counter()
    inputs = await asyncio.gather(*coroutines)
    timer_stop = time.perf_counter()
    print(f"Finished Pre-process Coroutine tasks: {len(inputs)}")

    print(f"* Finished all concurrent requests in... {timer_stop - timer_start:0.4f} seconds")

    errors = list(filter(lambda input: type(input[1]) == Error, inputs))
    print(f"Errors: {len(errors)}")

    prompt_values = list(
        filter(lambda input: type(input[1]) == ChatPromptValue, inputs)
    )
    print(f"Valid Inputs: {len(prompt_values)}")

    invoke_coroutines = list(map(process_inputs, prompt_values))
    print(f"AInvoke Coroutine tasks: {len(invoke_coroutines)}")

    timer_start = time.perf_counter()
    result = await asyncio.gather(*invoke_coroutines)
    timer_stop = time.perf_counter()
    print(f"Finished AInvoke Coroutine tasks: {len(result)}")

    print(f"* Finished all concurrent requests in... {timer_stop - timer_start:0.4f} seconds")

    processed_result = list(map(post_process_outputs, list(result + errors)))
    response["result"] = processed_result

    return response


async def pre_process_inputs(doc: Document):
    """Pre-process document to add context prior to analysis."""

    doc_text = doc.page_content

    # (vector search) Query vectorstore for relevent legal context.
    timer_start = time.perf_counter()
    search_result_docs = await aquery_vector_store(doc_text, db=db)
    timer_stop = time.perf_counter()
    print(f"Finished vector search in... {timer_stop - timer_start:0.4f} seconds")

    if search_result_docs is None:
        # (error) if vector search finds no relevant context.
        return (doc_text, Error(message=ERR_ANALYSIS_FAILED))
    else:
        legal_context = join_similarity_search_results(search_result_docs)

        # (prompt value) Fill placeholders with article and provide matching legal context.
        prompt_template = ChatPromptTemplate.from_template(
            COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE
        )
        prompt_value = prompt_template.invoke(
            {"article_context": doc_text, "legal_context": legal_context}
        )

        return (doc_text, prompt_value)


async def process_inputs(input: tuple[str, ChatPromptValue]):
    """Process prompt values by running through analysis."""

    (doc_text, prompt_val) = input

    # (llm.ainvoke) Invoke llm with prompt value.
    timer_start = time.perf_counter()
    response = await llm.ainvoke(prompt_val)
    timer_stop = time.perf_counter()

    print(f"Finished ainvoke in... {timer_stop - timer_start:0.4f} seconds")

    return (doc_text, response)


def post_process_outputs(output: tuple[str, Error | BaseMessage | AIMessage]):
    """Post-process outputs to format data structure after completing analysis."""

    (doc_text, response) = output

    obj = {"text": doc_text}

    if type(response) == BaseMessage or AIMessage:
        try:
            compliance_analysis = parse_compliance_analysis(
                extract_json_obj(response.content)
            )
            obj["compliance_analysis"] = compliance_analysis

        except Exception as error:
            obj["error"] = ERR_JSON_PARSER.format(cause=error)

    elif type(response) == Error:
        obj["error"] = response.message

    else:
        obj["error"] = response

    return obj
