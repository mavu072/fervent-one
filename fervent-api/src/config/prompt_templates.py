# Prompt Templates

SYSTEM_INSTRUCTION_PROMPT = """Act as a legal advisor.
Assume all questions are only relating to South African laws and statutes.
Answer all question based only on the provided context or chat history.
"""

SYSTEM_INSTRUCTION_PROMPT_V2 = """Act as a legal assistant.
You assist with legal questions.
You are friendly.
Your answers are easy to understand.
Assume all questions are only related to South African laws and statutes.
Answer all questions based only on the provided context or chat history.
"""

CONTEXTUALISE_CHAT_HISTORY_PROMPT = """Given a chat history and the latest user message which might reference context in the chat history, formulate a standalone question which can be understood without the chat history.
Do NOT answer the question, just reformulate it if needed and otherwise return it as is.
"""

QA_PROMPT_TEMPLATE = """Answer the following question:

<context>
{context}
</context>

Question: {input}
"""

CUSTOM_FILE_QA_PROMPT_TEMPLATE = """Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}
"""

COMPLIANCE_REPORT_PROMPT_TEMPLATE = """
Objective: Analyze the provided employment contract, offer letter, or any other employment-related legal agreement for compliance with South African employment laws.
Identify non-compliant sections, provide explanations with references to relevant laws, and suggest compliant alternatives.

Input:
{document_context}

Output:
Compliance Report (JSON)

Compliance Report Structure:
- overall_compliance_rating: integer (0-100)
- non_compliant_sections: array of objects
    - section_title: string
    - non_compliant_text: string
    - explanation: string
    - reference: object
        - text: string
        - link: string
    suggested_alternative: object
        - text: string
        - link: string
- compliant_sections: array of objects
    - section_title: string
    - compliant_text: string
    - positive_note: string
"""

COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE = """
Objective: Analyze the provided article from an employment contract, offer letter, or any other employment-related legal agreement for compliance with South African employment laws.
- Identify any non-compliant sections, explain why they are non-compliant with references to relevant laws, and provide a revised, compliant version of the non-compliant section.  
- Identify compliant sections and provide a brief positive note where applicable.
- Provide only the compliance analysis in JSON format with the provided structure.

Context:
- The following legal framework should be used for the analysis:

<context>
{legal_context}
</context>

Input:
- The article to be analyzed:

<article>
{article_context}
</article>

Output:
- Compliance Analysis (JSON):

- non_compliant_sections: array of objects
    - section_title: string
    - non_compliant_text: string
    - explanation: string
    - reference: object
        - text: string
    suggested_alternative: object
        - text: string
- compliant_sections: array of objects
    - section_title: string
    - compliant_text: string
    - positive_note: string
"""