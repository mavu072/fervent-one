from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import Document
from langchain_openai import ChatOpenAI
from langchain.chains import ( create_retrieval_chain, create_history_aware_retriever )
from langchain.chains.combine_documents import create_stuff_documents_chain

from src.services.vector_db import get_chromadb_retriever
from src.config.prompt_templates import PROMPT_TEMPLATE, CONTEXTUALISE_CHAT_HISTORY_PROMPT

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI()
retriever = get_chromadb_retriever()

def create_llm_prompt(context_text:str, query_text:str):
    """Creates the LLM prompt from a prompt template."""

    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, input=query_text)

    return prompt


def get_llm_prompt_response(prompt:str):
    """Creates a response for a prompt."""

    response = llm.invoke(prompt)

    return response


def get_llm_conversational_response(query_message:str, message_history:list):
    """Creates a response for the user message using the previous messages as context."""

    contextualize_input_prompt =  ChatPromptTemplate.from_messages(
        [
            ("system", CONTEXTUALISE_CHAT_HISTORY_PROMPT),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_input_prompt)

    qa_system_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", PROMPT_TEMPLATE),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_system_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    response = rag_chain.invoke({"input": query_message, "chat_history": message_history})
    # print(response)

    return response


def get_content_sources(results:list[tuple[Document, float]]):
    """Returns a list of paragraphs used as sources for the response."""

    sources = [[f'Source: {doc.metadata.get("source", None)}, Quoted text: {doc.page_content}'] for doc, _score in results]

    return sources