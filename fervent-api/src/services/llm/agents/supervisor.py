from langgraph.prebuilt import create_react_agent
from langgraph.graph import StateGraph, MessagesState, START, END
from typing import Literal

from src.services.llm.agents.config import (
    model,
    SUPERVISOR,
    GENERAL_AGENT,
    PERSONAL_AGENT,
)
from src.services.llm.agents.agents import general_agent, create_personal_agent
from src.services.llm.agents.tools import create_handoff_tool


# Handoffs
assign_to_general_agent = create_handoff_tool(
    agent_name=GENERAL_AGENT,
    description="Assign task to a general agent.",
)

assign_to_personal_agent = create_handoff_tool(
    agent_name=PERSONAL_AGENT,
    description="Assign task to a personal agent.",
)


def create_agent_supervisor(
    personal_vectorstore: str,
    output_mode: Literal["full_history", "last_message"] = "last_message",
):
    """Agent supervisor."""

    # Create personal agent
    personal_agent = create_personal_agent(personal_vectorstore)

    # Create supervisor agent
    supervisor_agent = create_react_agent(
        model=model,
        tools=[assign_to_general_agent, assign_to_personal_agent],
        prompt=(
            "You are a supervisor managing two agents:\n"
            "- a general agent. Assign general questions about South African labour law to this agent.\n"
            "- a personal agent. Assign questions that require or benefit from personal context found in the user’s documents to this agent. Assume that all necessary documents have been provided.\n"
            "RULES:\n"
            "- Assign work to one agent at a time, DO NOT call agents in parallel.\n"
            "- Do NOT do any work yourself.\n"
            "- An agent MUST ALWAYS report back to you and you respond with the final answer.\n"
            "- In your final answer to the user, you MUST include the agent’s response, in addition to your own friendly explanation or summary.\n"
            "- Never mention the two agents.\n"
            "- ALWAYS respond in a friendly and polite tone.\n"
            "- Answers MUST be easy to understand for a middle school-level child.\n"
            "- ALWAYS ASK clarifying questions on the matter when more context is required."
            "- If a question does not relate to South African labour law or the user’s personal documents, respond politely that it is outside your scope. DO NOT assign such questions to any agent.\n"
            "- ALWAYS OFFER to provide council and step-by-step guides on the matter."
        ),
        name=SUPERVISOR,
    )

    # Multi-agent supervisor graph
    supervisor = (
        StateGraph(MessagesState)
        .add_node(supervisor_agent, destinations=(GENERAL_AGENT, PERSONAL_AGENT, END))
        .add_node(general_agent)
        .add_node(personal_agent)
        .add_edge(START, SUPERVISOR)
        .add_edge(
            GENERAL_AGENT, SUPERVISOR
        )  # agents must always return back to the supervisor
        .add_edge(PERSONAL_AGENT, SUPERVISOR)
        .compile()
    )

    return supervisor
