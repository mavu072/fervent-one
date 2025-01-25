from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import Document
from langchain_openai import ChatOpenAI
from langchain.chains import ( create_retrieval_chain, create_history_aware_retriever )
from langchain.chains.combine_documents import create_stuff_documents_chain

from src.services.vector_db import get_chromadb_retriever
from src.config.prompt_templates import QA_PROMPT_TEMPLATE, CONTEXTUALISE_CHAT_HISTORY_PROMPT, SYSTEM_INSTRUCTION_PROMPT_V2 as SYSTEM_INSTRUCTION_PROMPT

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
    history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_input_prompt)

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
    retrieval_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    # invoke and replace placeholders with values.
    response = retrieval_chain.invoke({"input": query_message, "chat_history": message_history})

    return response


def get_content_sources(results: list[tuple[Document, float]]):
    """Returns a list of paragraphs used as sources for the response."""

    sources = [[f'Source: {doc.metadata.get("source", None)}, Quoted text: {doc.page_content}'] for doc, _score in results]

    return sources