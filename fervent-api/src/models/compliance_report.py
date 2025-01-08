from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class Reference(BaseModel):
    text: str
    link: str

class SuggestedAlternative(BaseModel):
    text: str
    link: str

class NonCompliantSection(BaseModel):
    section_title: str
    non_compliant_text: str
    explanation: str
    reference: Reference
    suggested_alternative: SuggestedAlternative

class CompliantSection(BaseModel):
    section_title: str
    compliant_text: str
    positive_note: str

class ComplianceReport(BaseModel):
    overall_compliance_rating: int
    non_compliant_sections: List[NonCompliantSection]
    compliant_sections: List[CompliantSection]

# Example usage:
example_data = {
    "overall_compliance_rating": 70,
    "non_compliant_sections": [
        {
            "section_title": "Section 2: Compensation",
            "non_compliant_text": "The Employee is not entitled to any additional overtime pay.",
            "explanation": "This clause is non-compliant with South African labor laws, which require employees to be compensated for overtime work.",
            "reference": {
                "text": "Basic Conditions of Employment Act, Section 10",
                "link": "https://www.labour.gov.za/basic-conditions-of-employment-act"
            },
            "suggested_alternative": {
                "text": "The Employee is entitled to overtime pay for any hours worked beyond the standard 45 hours per week, in accordance with South African labor laws.",
                "link": "https://www.labour.gov.za/basic-conditions-of-employment-act#section-10"
            }
        }
    ],
    "compliant_sections": [
        {
            "section_title": "Section 1: Position and Duties",
            "compliant_text": "The Employer agrees to employ the Employee as [Job Title]. The Employee's duties and responsibilities shall include [Job Responsibilities]. The Employee agrees to perform such duties faithfully and to the best of their abilities.",
            "positive_note": "This section clearly defines the job title and responsibilities, which is in compliance with standard employment contract requirements."
        }
    ]
}