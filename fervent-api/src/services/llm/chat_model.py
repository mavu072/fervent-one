from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.schema import Document

from src.models.error import Error
from src.services.vectorstores.chroma import get_chromadb_retriever, query_chromadb
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
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI()
retriever = get_chromadb_retriever()


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


def perform_document_analysis(articles: list[Document]):
    """Performs an analysis on a document.
    \n
    **Article** refers to clauses/sections in a document.
    """

    prompt_template = ChatPromptTemplate.from_template(
        COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE
    )

    response = {"result": []}

    for i in range(len(articles)):

        # Article selection.
        article_text = articles[i].page_content
        article_response = {
            "id": i,
            "text": article_text,
        }

        # (vector search) Query vectorstore for relevent legal context.
        search_result_docs = query_chromadb(article_text)

        if search_result_docs is None:
            # Provide error, if vector search finds no relevant context.
            article_response["error"] = Error(message=ERR_ANALYSIS_FAILED)
        else:
            # Format search result.
            legal_context = join_similarity_search_results(search_result_docs)

            # Fill placeholders with article and provide matching legal context, then invoke llm.
            prompt = prompt_template.format(
                article_context=article_text, legal_context=legal_context
            )
            ai_response = llm.invoke(prompt)

            # Try parse response and provide error, if fails.
            try:
                analysis_result = parse_compliance_analysis(
                    extract_json_obj(ai_response.content)
                )
                article_response["compliance_analysis"] = analysis_result
            except Exception as error:
                article_response["error"] = Error(message=ERR_JSON_PARSER.format(cause=error))

        # Add result.
        response["result"].append(article_response)

    return response
