PROMPT_TEMPLATE = """Act as a legal advisor.
Assume all questions are only relating to South African employment laws and statutes.
Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {query}
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