from src.models.compliance_report import ComplianceReport
from src.models.compliance_analysis import ComplianceAnalysis

import json


def parse_compliance_report(json_str: str):
    """Parses a string JSON object into a Compliance Report class object."""

    json_obj = json.loads(json_str)
    report = ComplianceReport(**json_obj)

    return report


def parse_compliance_analysis(json_str: str):
    """Parses a string JSON object into a Compliance Analysis class object."""

    json_obj = json.loads(json_str)
    analysis = ComplianceAnalysis(**json_obj)

    return analysis
