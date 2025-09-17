from langgraph.prebuilt import create_react_agent

from src.services.llm.agents.config import model, GENERAL_AGENT, PERSONAL_AGENT
from src.services.llm.agents.tools import retrieve, create_custom_retrieve_tool


general_agent = create_react_agent(
    model=model,
    tools=[retrieve],
    prompt=(
        "You are a general purpose agent.\n\n"
        "INSTRUCTIONS:\n"
        "- You answer questions ONLY relating to South African labour laws and statutes\n"
        "- You do NOT have access to any personal data and files about the user\n"
        "- If a question requires personal context you do not have, politely explain that you cannot answer accurately without it\n"
        "- After you're done with your tasks, respond to the supervisor directly\n"
        "- Respond ONLY with the results of your work, do NOT include ANY other text."
    ),
    name=GENERAL_AGENT,
)


def create_personal_agent(personal_vectorstore: str):
    """Create a personal agent with access to the user's personal vector store."""

    retrieve_tool = create_custom_retrieve_tool(personal_vectorstore)

    return create_react_agent(
        model=model,
        tools=[retrieve_tool],
        prompt=(
            "You are a personal context agent.\n\n"
            "INSTRUCTIONS:\n"
            "- You ONLY answer questions that require or benefit from personal context found in the user’s documents.\n"
            "- You do NOT answer general questions about South African labour law unless they relate directly to the user's documents or situation.\n"
            "- Your primary data source is the user's documents. Do NOT speculate or generalize beyond them.\n"
            "- If the necessary information is not present in the user's documents, politely state that the context is missing and you cannot provide a reliable answer.\n"
            "- After you're done with your tasks, respond to the supervisor directly.\n"
            "- Respond ONLY with the results of your work, do NOT include ANY other text."
        ),
        name=PERSONAL_AGENT,
    )
