from src.config.prompt_templates import PROMPT_TEMPLATE, CONTEXTUALISE_CHAT_HISTORY_PROMPT, COMPLIANCE_REPORT_PROMPT_TEMPLATE

def test_prompt_template():
    assert PROMPT_TEMPLATE is not None

    context = "What is pytest?"
    input = "A delightful test framework for python applications."

    result = PROMPT_TEMPLATE.format(context=context, input=input)

    assert result.find(context) is not -1
    assert result.find(input) is not -1


def test_compliance_report_prompt_template():
    assert COMPLIANCE_REPORT_PROMPT_TEMPLATE is not None

    document_context = "This is a document about nothing."

    result = COMPLIANCE_REPORT_PROMPT_TEMPLATE.format(document_context=document_context)

    assert result.find(document_context) is not -1


def test_contextualise_chat_history_prompt():
    assert CONTEXTUALISE_CHAT_HISTORY_PROMPT is not None
