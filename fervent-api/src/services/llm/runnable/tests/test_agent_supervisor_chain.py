from src.services.llm.runnable.agent_supervisor_chain import AgentSupervisorChain

import pytest


agent_chain = AgentSupervisorChain("TEST")

def test_invoke():
    question = "what's (3 + 5) x 7"
    # question = "What is the Purpose of this Act?"
    answer = agent_chain.invoke(question)
    print(f"Question: {question}")
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
    
    answer = agent_chain.invoke(question, history)
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

    answer = await agent_chain.ainvoke(msg, history)
    print(f"Answer: {answer}")

    assert type(answer) is str
    assert answer.find(subject) is not -1
