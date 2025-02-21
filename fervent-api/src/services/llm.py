from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.schema import Document

from src.models.error import Error
from src.services.vectorstores.chroma import get_chromadb_retriever, query_chromadb
from src.config.prompt_templates import (
    QA_PROMPT_TEMPLATE,
    CONTEXTUALISE_CHAT_HISTORY_PROMPT,
    SYSTEM_INSTRUCTION_PROMPT_V2 as SYSTEM_INSTRUCTION_PROMPT,
    COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE,
)
from src.utils.model_utils import parse_compliance_analysis
from src.utils.vectorstores.vectorstore_utils import join_similarity_search_results
from src.utils.json_utils import extract_json_obj
from src.utils.exception_utils import ERR_ANALYSIS_FAILED, ERR_JSON_PARSER

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI()
retriever = get_chromadb_retriever()


def get_llm_prompt_response(query_text: str, context_text: str):
    """Creates a response for a prompt."""

    # Create prompt from a prompt template
    prompt_template = ChatPromptTemplate.from_template(QA_PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, input=query_text)
    response = llm.invoke(prompt)

    return response


def get_llm_conversational_response(query_message: str, message_history: list):
    """Creates a response for the user message using the previous messages as context."""

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

    # invoke and replace placeholders with values.
    response = retrieval_chain.invoke(
        {"input": query_message, "chat_history": message_history}
    )

    return response


def get_llm_analysis_response(articles: list[Document]):
    """Creates an analysis response for articles within a document. Article refers to clauses/sections in a document."""

    response = {"result": []}
    prompt_template = ChatPromptTemplate.from_template(
        COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE
    )

    for i in range(len(articles)):
        # Select article.
        article = articles[i]
        article_text = article.page_content
        article_response = {
            "id": i,
            "text": article_text,
        }

        # Vector search: Query vectorstore for relevent legal context.
        search_result_docs = query_chromadb(article_text)
        if search_result_docs is None:
            # Pass error.
            article_response["error"] = Error(message=ERR_ANALYSIS_FAILED)
        else:
            # Format search result.
            legal_context = join_similarity_search_results(search_result_docs)

            # Do analysis.
            prompt = prompt_template.format(
                article_context=article_text, legal_context=legal_context
            )
            ai_response = llm.invoke(prompt)

            # Parse response.
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
