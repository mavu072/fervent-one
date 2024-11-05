from langchain.prompts import ChatPromptTemplate
from langchain.schema import Document
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain # TODO delete
from langchain.chains import create_retrieval_chain

from services.vector_db import query_chromadb, get_chromadb_retriever

from utils.llm_prompt_utils import PROMPT_TEMPLATE

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def create_llm_prompt(context_text:str, query_text:str):
    """Creates the LLM prompt from a prompt template."""

    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, query=query_text)

    return prompt


def get_llm_prompt_response(prompt:str):
    """Creates a response for a prompt."""

    model = ChatOpenAI()
    response = model.invoke(prompt)

    return response


def get_llm_conversational_response(query_message:str, message_history:list):
    """Creates a response for the user message using the previous messages as context."""
    
    retriever = get_chromadb_retriever()
    qa_chain = ConversationalRetrievalChain.from_llm(ChatOpenAI(), retriever)
    response = qa_chain.invoke({"question": query_message, "chat_history": message_history})

    return response


def get_content_sources(results:list[tuple[Document, float]]):
    """Returns a list of paragraphs used as sources for the response."""

    sources = [[f'Source: {doc.metadata.get("source", None)}, Quoted text: {doc.page_content}'] for doc, _score in results]

    return sources