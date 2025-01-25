from langchain_core.messages.ai import AIMessage
from langchain.schema import Document
from src.services.llm import get_llm_prompt_response, get_llm_conversational_response


def test_get_llm_prompt_response():
    query = "What is pytest?"
    context = "A delightful test framework for python applications."
    answer = "test framework"

    result = get_llm_prompt_response(query_text=query, context_text=context)

    assert result is not None
    assert type(result) is AIMessage
    assert result.id
    assert result.content
    assert type(result.content) is str
    assert result.content.lower().find(answer) is not -1
    assert result.usage_metadata
    assert result.response_metadata
    assert result.additional_kwargs
    assert result.usage_metadata["input_tokens"] is 33
    assert result.response_metadata["token_usage"]["prompt_tokens"] is 33


def test_get_llm_conversational_response():
    name = "Rick Sanchez"
    msg = "What is my name?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master.")
    ]

    result = get_llm_conversational_response(query_message=msg, message_history=history)

    assert result["input"] is msg
    assert result["chat_history"] is history
    assert type(result["answer"]) is str
    assert result["answer"].find(name) is not -1
    assert type(result["context"]) is list
    assert type(result["context"][0]) is Document


def test_history_and_context_awareness():
    name = "Rick Sanchez"
    subject = "CCMA"
    msg = f"What is my name and how can the {subject} help me at work?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master.")
    ]

    result = get_llm_conversational_response(query_message=msg, message_history=history)

    assert type(result["answer"]) is str
    assert result["answer"].find(name) is not -1
    assert result["answer"].find(subject) is not -1


def test_history_and_context_memory():
    name = "Rick Sanchez"
    subject = "CCMA"
    msg = "How can I report a dispute?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master."),
        ("human", f"What is my name and how can the {subject} help me at work?"),
        ("ai", "Your name is Rick Sanchez. The CCMA (Commission for Conciliation, Mediation and Arbitration) can help you at work by assisting with resolving disputes related to the interpretation or application of labor laws."),
    ]

    result = get_llm_conversational_response(query_message=msg, message_history=history)

    assert type(result["answer"]) is str
    assert result["answer"].find(subject) is not -1
    