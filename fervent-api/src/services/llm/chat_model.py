from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.prompt_values import PromptValue, ChatPromptValue
from langchain_core.messages import BaseMessage, AIMessage
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.schema import Document

from src.models.error import Error
from src.services.vectorstores.chroma import chroma_retriever, chroma_client, query_chroma, aquery_vector_store
from src.services.llm.prompt_templates import (
    QA_PROMPT_TEMPLATE,
    CONTEXTUALISE_CHAT_HISTORY_PROMPT,
    SYSTEM_INSTRUCTION_PROMPT_V2 as SYSTEM_INSTRUCTION_PROMPT,
    COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE,
)
from src.services.vectorstores.vector_search_utils import join_similarity_search_results
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


def create_completion(prompt_val: PromptValue):
    """Create a completion for a prompt value."""

    ai_message = llm.invoke(prompt_val)

    return ai_message


def create_prompt_response(query_text: str, context_text: str):
    """Responds to a message, using with the system's QA prompt."""

    # Create prompt from a prompt template
    prompt_template = ChatPromptTemplate.from_template(QA_PROMPT_TEMPLATE)
    # Fill placeholders with values and invoke llm.
    prompt = prompt_template.format(context=context_text, input=query_text)
    response = llm.invoke(prompt)

    return response


def create_conversational_response(query_message: str, message_history: list):
    """Responds to a message and keeps the previous messages in the context."""

    # (chat history chain)
    # CONTEXTUALISE_CHAT_HISTORY_PROMPT: a prompt instructed to produce a rephrased question based on the user's last question, but referencing previous messages.
    contextualize_input_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", CONTEXTUALISE_CHAT_HISTORY_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_input_prompt
    )

    # (documents chain)
    # QA_PROMPT_TEMPLATE: a prompt instructed to produce an answer based on the context and chat history.
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_INSTRUCTION_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", QA_PROMPT_TEMPLATE),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    # (retrieval chain)
    retrieval_chain = create_retrieval_chain(
        history_aware_retriever, question_answer_chain
    )

    # Fill placeholders with values and invoke retrieval chain.
    response = retrieval_chain.invoke(
        {"input": query_message, "chat_history": message_history}
    )

    return response


async def perform_document_analysis(articles: list[Document]):
    """Performs an analysis on a document.
    \n
    **Article** refers to clauses/sections in a document.
    """

    response = {"result": []}

    coroutines = list(map(pre_process_inputs, articles))
    print(f"Pre-process coroutines: {len(coroutines)}")

    timer_start = time.perf_counter()
    inputs = await asyncio.gather(*coroutines)
    timer_stop = time.perf_counter()
    
    print(f"Finished Pre-process Coroutine tasks: {len(inputs)}")
    print(f"*** Finished all concurrent requests in... {timer_stop - timer_start:0.4f} seconds")

    errors = list(filter(lambda input: type(input[1]) is str, inputs))
    print(f"Errors: {len(errors)}")

    prompt_values = list(filter(lambda input: type(input[1]) is PromptValue or ChatPromptValue, inputs))
    print(f"Valid Inputs: {len(prompt_values)}")

    invoke_coroutines = list(map(process_inputs, prompt_values))
    print(f"AInvoke coroutines: {len(invoke_coroutines)}")

    timer_start = time.perf_counter()
    result = await asyncio.gather(*invoke_coroutines)
    timer_stop = time.perf_counter()

    print(f"Finished AInvoke Coroutine tasks: {len(result)}")
    print(f"*** Finished all concurrent requests in... {timer_stop - timer_start:0.4f} seconds")

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
        return (doc_text, ERR_ANALYSIS_FAILED)
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


async def process_inputs(input: tuple[str, PromptValue | ChatPromptValue]):
    """Process prompt values by running through analysis."""

    (doc_text, prompt_val) = input

    # (llm.ainvoke) Invoke llm with prompt value.
    timer_start = time.perf_counter()
    response = await llm.ainvoke(prompt_val)
    timer_stop = time.perf_counter()

    print(f"Finished ainvoke in... {timer_stop - timer_start:0.4f} seconds")

    return (doc_text, response)


def post_process_outputs(output: tuple[str, str | BaseMessage | AIMessage]):
    """Post-process outputs to format data structure after completing analysis."""

    (doc_text, response) = output

    parsed = {"text": doc_text}

    if type(response) == BaseMessage or AIMessage:
        try:
            compliance_analysis = parse_compliance_analysis(
                extract_json_obj(response.content)
            )
            parsed["compliance_analysis"] = compliance_analysis

        except Exception as error:
            parsed["error"] = ERR_JSON_PARSER.format(cause=error)
    else:
        parsed["error"] = response

    return parsed
