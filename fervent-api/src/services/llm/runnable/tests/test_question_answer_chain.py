from src.services.llm.runnable.question_answer_chain import QuestionAnswerChain

import pytest

qa_chain = QuestionAnswerChain()

def test_invoke():
    answer = qa_chain.invoke("What is the Purpose of this Act?")
    print(f"Answer: {answer}")

    assert answer


def test_history_and_context_awareness():
    name = "Rick Sanchez"
    subject = "CCMA"
    question = f"What is my name and how can the {subject} help me at work?"
    history = [
        ("human", f"My name is {name}."), 
        ("ai", "I understand master.")
    ]
    
    answer = qa_chain.invoke(question, history)
    print(f"Answer: {answer}")

    assert type(answer) is str
    assert answer.find(name) is not -1
    assert answer.find(subject) is not -1


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

    answer = await qa_chain.ainvoke(msg, history)
    print(f"Answer: {answer}")

    assert type(answer) is str
    assert answer.find(subject) is not -1
