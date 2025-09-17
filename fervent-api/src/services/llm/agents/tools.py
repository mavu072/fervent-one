from langchain_core.tools import tool, InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.graph import MessagesState
from langgraph.types import Command
from typing import Annotated

from src.services.vectorstores.chroma import query_chroma, query_vector_store
from src.services.vectorstores.collections import get_collection


@tool(response_format="content_and_artifact")
def retrieve(query: str):
    """Retrieve information related to a query."""
    
    retrieved_docs = query_chroma(query)
    serialized = "\n\n".join(
        (f"Source: {doc.metadata}\n" f"Content: {doc.page_content}")
        for doc, score in retrieved_docs
    ) if retrieved_docs else ""
    
    return serialized, retrieved_docs


def create_custom_retrieve_tool(vectorstore_name: str):
    """Create a custom retrieve tool."""

    @tool(response_format="content_and_artifact")
    def retrieve(query: str):
        """Retrieve information related to a query from a users custom vector store."""

        custom_vectorstore = get_collection(vectorstore_name)

        retrieved_docs = query_vector_store(query, custom_vectorstore)
        serialized = "\n\n".join(
            (f"Source: {doc.metadata}\n" f"Content: {doc.page_content}")
            for doc, score in retrieved_docs
        ) if retrieved_docs else ""

        return serialized, retrieved_docs
    
    return retrieve


def create_handoff_tool(*, agent_name: str, description: str | None = None):
    """Create a handoff tool."""
    
    name = f"transfer_to_{agent_name}"
    description = description or f"Ask {agent_name} for help."

    @tool(name, description=description)
    def handoff_tool(
        state: Annotated[MessagesState, InjectedState],
        tool_call_id: Annotated[str, InjectedToolCallId],
    ) -> Command:
        tool_message = {
            "role": "tool",
            "content": f"Successfully transferred to {agent_name}",
            "name": name,
            "tool_call_id": tool_call_id,
        }
        # highlight-next-line
        return Command(
            # highlight-next-line
            goto=agent_name,  # (1)!
            # highlight-next-line
            update={**state, "messages": state["messages"] + [tool_message]},  # (2)!
            # highlight-next-line
            graph=Command.PARENT,  # (3)!
        )

    return handoff_tool