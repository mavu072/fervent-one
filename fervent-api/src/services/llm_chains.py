from src.services.llm import (
    get_llm_prompt_response, 
    get_llm_conversational_response,
    get_llm_analysis_response
)
from src.services.vectorstores.chroma import query_chromadb
from src.services.document_loader import load_pdf_document, split_documents_to_chunks
from src.utils.vectorstores.vectorstore_utils import join_similarity_search_results, get_content_sources
from src.utils.exception_utils import ERR_NO_MATCH_FOUND

from typing import BinaryIO, TextIO


def run_retrieval_chain(query_text:str):
    """Runs a retrieval chain to create a response for user messages."""

    # documents matching query.
    result_docs = query_chromadb(query_text)

    if result_docs is None:
        raise Exception(ERR_NO_MATCH_FOUND)
    
    context_text = join_similarity_search_results(result_docs)

    response = get_llm_prompt_response(query_text, context_text)

    sources = get_content_sources(result_docs)

    return { 
        "content": response.content, 
        "sources": sources 
        }


def run_conversational_chain(user_message:str, message_history:list):
    """Runs a conversational retrieval chain to create responses to user messages."""

    result = get_llm_conversational_response(user_message, message_history)
    response = result['answer']

    # documents from documents stuff chain.
    docs = result['context']

    result_docs = [[doc, 0] for doc in docs]
    sources = get_content_sources(result_docs)

    message_history.append((user_message, response))

    return { 
        "content": response, 
        "message_history": result['chat_history'],
        "sources": sources
        }


def run_conversational_chain_with_files(user_message: str, message_history: list, files):
    """ """
    # TODO Implement

    return


async def run_analysis_chain(filepath: str):
    """Runs an analysis chain to create responses to an uploaded file."""

    # Load Document.
    doc_pages = await load_pdf_document(filepath)

    # Split Pages into smaller chunks for analysis.
    doc_chunks = split_documents_to_chunks(doc_pages)

    # Analyse Pages.
    response = get_llm_analysis_response(doc_chunks)

    return response