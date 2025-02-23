from langchain.prompts import ChatPromptTemplate


def create_prompt_from_template(prompt_template: str, input: str, context: str):
    """Creates a prompt from a template and fills in the template variables."""

    template = ChatPromptTemplate.from_template(prompt_template)
    prompt = template.format(context=context, input=input)

    return prompt
