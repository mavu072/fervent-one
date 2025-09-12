from langchain.schema import Document

from src.models.compliance_analysis import ComplianceAnalysis
from src.services.llm.runnable.document_analysis_chain import DocumentAnalysisChain

import pytest

doc_analyzer_chain = DocumentAnalysisChain()

@pytest.mark.asyncio
async def test_analysis():
    article0 = Document("""1. Termination
                     The Employer may terminate this agreement at any time without notice or reason.""")
    article1 = Document("""2. Compensation.
                     The Employer agrees to pay the Employee a salary of 2000 rands per month.""")

    articles =  [article0, article1]
    response = await doc_analyzer_chain.analyze(articles)
    print(f"Analysis: {response}")

    assert type(response) is dict
    assert type(response["result"]) is list

    result = response["result"]
    assert type(result[0]["compliance_analysis"]) is ComplianceAnalysis
    assert type(result[1]["compliance_analysis"]) is ComplianceAnalysis


@pytest.mark.asyncio
async def test_hallucination():
    articles =  [Document("Foo Bar")]
    response = await doc_analyzer_chain.analyze(articles)

    assert type(response) is dict
    assert type(response["result"]) is list

    result = response["result"]
    assert type(result[0]["error"]) is str