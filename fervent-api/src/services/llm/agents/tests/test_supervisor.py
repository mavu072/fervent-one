from src.services.llm.agents.supervisor import create_agent_supervisor
from src.utils.print_utils import pretty_print_messages

example_user_vectorstore_name = "FJFBWPKr7Xe1Z25xiUaxBwUQ9Hs2" # or use "TEST" if no users yet.
supervisor = create_agent_supervisor(example_user_vectorstore_name, "full_history")

def test_agent_supervisor():
    question = "what's (3 + 5) x 7" # Out of scope test
    # question = "How can I report a dispute?" # General agent routing and answering test
    # question = "How many leave days do I have on my contract?" # Personal agent routing and answering test
    # question = "Does my contract allow overtime?" # Personal agent - no info test

    for chunk in supervisor.stream(
        {"messages": [{"role": "user", "content": question}]}
    ):
        pretty_print_messages(chunk)

    assert supervisor


