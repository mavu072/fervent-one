from langchain_chroma import Chroma

from src.services.llm.chat_model import (
    create_prompt_response,
    create_conversational_response,
    create_compliance_analysis,
)
from src.services.vectorstores.chroma import query_chroma
from src.services.document_loaders.loaders import load_pdf 
from src.services.text_splitters.splitters import split_documents
from src.services.vectorstores.search_utils import (
    join_similarity_search_results,
    get_content_sources,
)
from src.utils.exception_utils import ERR_NO_MATCH_FOUND


def run_retrieval_chain(query_text: str):
    """Runs a retrieval chain to create a response for user messages."""

    # documents matching query.
    result_docs = query_chroma(query_text)

    if result_docs is None:
        raise Exception(ERR_NO_MATCH_FOUND)

    context_text = join_similarity_search_results(result_docs)

    response = create_prompt_response(query_text, context_text)
    sources = get_content_sources(result_docs)

    return {"content": response.content, "sources": sources}


async def run_conversational_chain(user_message: str, message_history: list, vectorstore: Chroma = None):
    """Runs a conversational retrieval chain to create responses to user messages and files, if any."""

    result = await create_conversational_response(user_message, message_history, vectorstore)
    response = result["answer"]
    docs = result["context"] # documents from documents stuff chain.

    result_docs = [[doc, 0] for doc in docs]
    sources = get_content_sources(result_docs)

    message_history.append((user_message, response))

    return {
        "content": response,
        "message_history": result["chat_history"],
        "sources": sources,
    }


async def run_analysis_chain(filepath: str):
    """Runs an analysis chain to create a compliance analysis for a file."""

    # Load Document.
    doc_pages = await load_pdf(filepath)

    # Split Pages into smaller chunks for analysis.
    doc_chunks = split_documents(doc_pages)

    # Analyse Pages.
    response = await create_compliance_analysis(doc_chunks)

    return response
