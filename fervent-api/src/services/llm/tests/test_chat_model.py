from langchain_core.messages import AIMessage
from langchain_core.documents import Document
from src.models.compliance_analysis import ComplianceAnalysis
from src.services.llm.chat_model import (
    create_prompt_response,
    create_conversational_response,
    create_compliance_analysis,
)
from src.services.vectorstores.collections import create_collection

import pytest


def test_create_prompt_response():
    query = "What is pytest?"
    context = "A delightful test framework for python applications."
    answer = "test framework"

    result = create_prompt_response(query_text=query, context_text=context)

    assert result is not None
    assert type(result) is AIMessage
    assert result.id
    assert result.content
    assert type(result.content) is str
    assert result.content.lower().find(answer) is not -1
    assert result.usage_metadata
    assert result.response_metadata
    assert result.additional_kwargs
    assert result.usage_metadata["input_tokens"] is 31
    assert result.response_metadata["token_usage"]["prompt_tokens"] is 31


@pytest.mark.asyncio
async def test_create_conversational_response():
    name = "Rick Sanchez"
    msg = "What is my name?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master.")
    ]

    result = await create_conversational_response(query_message=msg, message_history=history)

    assert type(result) is dict
    assert result["input"] is msg
    assert result["chat_history"] is history
    assert type(result["answer"]) is str
    assert result["answer"].find(name) != -1
    assert type(result["context"]) is list
    assert type(result["context"][0]) is Document


@pytest.mark.asyncio
async def test_history_and_context_awareness():
    name = "Rick Sanchez"
    subject = "CCMA"
    msg = f"What is my name and how can the {subject} help me at work?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master.")
    ]

    result = await create_conversational_response(query_message=msg, message_history=history)

    assert type(result["answer"]) is str
    assert result["answer"].find(name) is not -1
    assert result["answer"].find(subject) is not -1


@pytest.mark.asyncio
async def test_history_and_context_memory():
    name = "Rick Sanchez"
    subject = "CCMA"
    msg = "How can I report a dispute?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master."),
        ("human", f"What is my name and how can the {subject} help me at work?"),
        ("ai", "Your name is Rick Sanchez. The CCMA (Commission for Conciliation, Mediation and Arbitration) can help you at work by assisting with resolving disputes related to the interpretation or application of labor laws."),
    ]

    result = await create_conversational_response(query_message=msg, message_history=history)

    assert type(result["answer"]) is str
    assert result["answer"].find(subject) is not -1


@pytest.mark.asyncio
async def test_inferencing_user_files():
    subject = "annual leave"
    msg = f"What does my contract say about {subject}?"
    history = [
        ("human", f"Hello"), 
        ("ai", "Hello, how can I help you?"),
    ]
    docs = [
        Document(
            page_content=f"The Employee is entitled to 10 days of paid annual leave per year.",
            metadata={'source': 'tmp\\user_files\\Employment Contract.pdf', 'start_index': 0},
        )
    ]
    vectorstore = create_collection("pytest", docs)

    result = await create_conversational_response(query_message=msg, message_history=history, vectorstore=vectorstore)
    print(f">>> Question: {msg}")
    print(f">>> Answer: {result["answer"]}")
    print(f">>> Custom Context: {result["custom_context"]}")
    print(f">>> Dict Keys: {list(result.keys())}")

    assert type(result["answer"]) is str
    assert result["answer"].find(subject) != -1


@pytest.mark.asyncio
async def test_create_compliance_analysis():
    article0 = Document("""1. Termination
                     The Employer may terminate this agreement at any time without notice or reason.""")
    article1 = Document("""2. Compensation.
                     The Employer agrees to pay the Employee a salary of 2000 rands per month.""")

    articles =  [article0, article1]
    response = await create_compliance_analysis(articles=articles)

    assert type(response) is dict
    assert type(response["result"]) is list

    result = response["result"]
    assert type(result[0]["compliance_analysis"]) is ComplianceAnalysis
    assert type(result[1]["compliance_analysis"]) is ComplianceAnalysis


@pytest.mark.asyncio
async def test_hallucination_during_analysis():
    articles =  [Document("Foo Bar")]

    response = await create_compliance_analysis(articles=articles)

    assert type(response) is dict
    assert type(response["result"]) is list

    result = response["result"]
    assert type(result[0]["error"]) is str