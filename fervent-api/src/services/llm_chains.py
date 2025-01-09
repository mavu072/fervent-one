from src.services.llm import get_llm_prompt_response, get_llm_conversational_response
from src.services.llm import create_llm_prompt, get_content_sources
from src.services.vector_db import query_chromadb
from src.utils.vector_db_utils import join_similarity_search_results
from src.utils.exception_utils import ERR_NO_MATCH_FOUND


def run_retrieval_chain(query_text:str):
    """Runs a retrieval chain to create a response for user messages."""

    print(f">>>>> Query: {query_text}")
    results = query_chromadb(query_text)

    # print(f">>>>> Results: {results}")
    if results is None:
        raise Exception(ERR_NO_MATCH_FOUND)
    
    context_text = join_similarity_search_results(results)
    print(f">>>>> Context match: {context_text}")

    prompt = create_llm_prompt(context_text, query_text)
    print(f">>>>> System Prompt: {prompt}")

    response = get_llm_prompt_response(prompt)
    print(f">>>>> Response: {response.content}")
    print(f">>>>> Response metadata: {response.response_metadata}")

    sources = get_content_sources(results)
    print(f">>>>> Sources: {sources}")

    return { "content": response.content, "sources": sources }


def run_conversational_chain(user_message:str, message_history:list):
    """Runs a conversational retrieval chain to create responses to user messages."""

    result = get_llm_conversational_response(user_message, message_history)
    print(f">>>>> User message: {user_message}")
    # print(f">>>>> Message history: {str(message_history)}")

    response = result['answer']
    print(f">>>>> Response: {response}")

    message_history.append((user_message, response))
    # print(f">>>>> Message history: {str(message_history)}")

    # Todo add sources and metadata
    return { "content": response, "message_history": result['chat_history'] }