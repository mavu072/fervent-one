from src.services.llm import get_llm_prompt_response, get_llm_conversational_response
from src.services.vectorstores.chroma import query_chromadb
from src.utils.vectorstores.vectorstore_utils import join_similarity_search_results, get_content_sources
from src.utils.exception_utils import ERR_NO_MATCH_FOUND


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

    return