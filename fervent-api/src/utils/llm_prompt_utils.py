from langchain.prompts import ChatPromptTemplate

from typing import Literal


def create_prompt_from_template(prompt_template: str, input: str, context: str):
    """Creates a prompt from a prompt template and fills in the template variables."""

    chat_prompt_template = ChatPromptTemplate.from_template(prompt_template)
    prompt = chat_prompt_template.format(context=context, input=input)

    return prompt
