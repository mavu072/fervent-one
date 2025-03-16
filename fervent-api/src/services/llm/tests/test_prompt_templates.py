from src.services.llm.prompt_templates import (
    QA_PROMPT_TEMPLATE,
    QA_CUSTOM_CONTEXT_PROMPT_TEMPLATE,
    CONTEXTUALISE_CHAT_HISTORY_PROMPT,
    COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE,
)


def test_qa_prompt_template():
    assert QA_PROMPT_TEMPLATE is not None

    input = "What is pytest?"
    context = "A delightful test framework for python applications."

    result = QA_PROMPT_TEMPLATE.format(context=context, input=input)

    assert result.find(input) is not -1
    assert result.find(context) is not -1


def test_qa_custom_context_prompt_template():
    assert QA_CUSTOM_CONTEXT_PROMPT_TEMPLATE is not None

    context = "William Shakespeare is an author and poet."
    custom_context = "In 2019, I read a quote by William Shakespeare. It said 'To be or not to be'."
    input = "Is 'To be or not to be?' this from Shakespeare?"

    result = QA_CUSTOM_CONTEXT_PROMPT_TEMPLATE.format(context=context, custom_context=custom_context, input=input)

    assert result.find(context) is not -1
    assert result.find(input) is not -1


def test_compliance_analysis_prompt_template():
    assert COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE is not None

    document_context = "This is a document about nothing."
    article_context = "Fake news."

    result = COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE.format(
        legal_context=document_context, article_context=article_context
    )

    assert result.find(document_context) is not -1


def test_contextualise_chat_history_prompt():
    assert CONTEXTUALISE_CHAT_HISTORY_PROMPT is not None
