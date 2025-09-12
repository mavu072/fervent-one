from langchain_experimental.data_anonymizer import PresidioReversibleAnonymizer
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnableMap, RunnablePassthrough, RunnableLambda, Runnable
from langchain.schema import Document
from langchain.prompts import ChatPromptTemplate
from langchain.callbacks.tracers import LangChainTracer
from langchain_openai import ChatOpenAI
from typing import Dict, Any

from src.models.error import Error
from src.services.pii_anonymization.pattern_recognizers import (
    south_african_id_recognizer,
    time_recognizer,
)
from src.services.pii_anonymization.operators import new_operators
from src.services.vectorstores.chroma import (
    chroma_client,
    aquery_vector_store,
)
from src.services.llm.prompt_templates import COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE
from src.services.vectorstores.search_utils import join_similarity_search_results
from src.utils.model_utils import parse_compliance_analysis
from src.utils.json_utils import extract_json_obj
from src.utils.exception_utils import ERR_ANALYSIS_FAILED, ERR_JSON_PARSER

import asyncio
import time

class DocumentAnalysisChain:

    def __init__(self):
        self.tracer = LangChainTracer()

        # 1. Initialize anonymizer
        self.anonymizer = PresidioReversibleAnonymizer(
            add_default_faker_operators=True,
            languages_config=None,
            faker_seed=42,
        )
        self.anonymizer.add_recognizer(south_african_id_recognizer)
        self.anonymizer.add_recognizer(time_recognizer)
        self.anonymizer.add_operators(new_operators)

        # 2. Initialize Vector DB
        self.db = chroma_client()

        # 3. Chat model
        self.model = ChatOpenAI(temperature=0.3)

        # 4. Prompt to fill placeholders with article and provide matching legal context.
        prompt = ChatPromptTemplate.from_template(COMPLIANCE_ANALYSIS_PROMPT_TEMPLATE)

        _inputs = RunnableMap(
            {
                "article_context": RunnablePassthrough(),
                "anonymized_input": RunnableLambda(
                    lambda x: self.anonymizer.anonymize(x["article_context"])
                ),
                "legal_context": RunnablePassthrough(),
            }
        )

        # 6. Full anonymizer-aware input chain
        self.full_chain: Runnable[Dict[str, Any], str] = (
            _inputs
            | RunnableLambda(self._restructure_inputs_for_retrieval)
            | prompt
            | self.model
            | StrOutputParser()
            | RunnableLambda(self.anonymizer.deanonymize)
        )

        # ... Last step is to call invoke (with a question) on the chain with deanonymization.
    
    def _restructure_inputs_for_retrieval(self, inputs: dict) -> dict:
        return {
            "article_context": inputs["anonymized_input"], 
            "legal_context":  inputs["legal_context"]
        }

    async def ainvoke(self, article_context: str, legal_context: str) -> str:
        return await self.full_chain.ainvoke(
            {
                "article_context": article_context,
                "legal_context": legal_context,
            },
            config={"callbacks": [self.tracer]}
        )

    async def analyze(self, articles: list[Document]) -> dict[str, list]:
        """Performs and creates a compliance analysis on a document.

            :param list[Document] articles: An article refers to clauses/sections in a document.
        """
        response = {"result": []}

        # 1. Pre-process
        coroutines = list(map(self.pre_process_inputs, articles))
        print(f"Pre-processing tasks: {len(coroutines)}")
        timer_start = time.perf_counter()
        inputs = await asyncio.gather(*coroutines)
        timer_stop = time.perf_counter()
        print(f"Finished Pre-processing tasks: {len(inputs)}")
        print(f"* Finished all concurrent requests in... {timer_stop - timer_start:0.4f} seconds")

        # Errors/Valid Inputs
        errors = list(filter(lambda input: type(input[1]) == Error, inputs))
        valid_inputs = list(filter(lambda input: type(input[1]) != Error, inputs))
        print(f"Errors: {len(errors)}")
        print(f"Inputs with valid legal contexts: {len(valid_inputs)}")

        # 2. Process
        invoke_coroutines = list(map(self.process_inputs, valid_inputs))
        print(f"Processing tasks: {len(invoke_coroutines)}")
        timer_start = time.perf_counter()
        result = await asyncio.gather(*invoke_coroutines)
        timer_stop = time.perf_counter()
        print(f"Finished Processing tasks: {len(result)}")
        print(f"* Finished all concurrent requests in... {timer_stop - timer_start:0.4f} seconds")

        # 3. Post-process
        processed_result = list(map(self.post_process_outputs, list(result + errors)))
        response["result"] = processed_result

        return response

    
    async def pre_process_inputs(self, doc: Document) -> tuple[str, str]:
        """Pre-process document to add context prior to analysis."""
        doc_text = doc.page_content

        # (vector search) Query vectorstore for relevent legal context.
        search_result_docs = await aquery_vector_store(doc_text, self.db)
        if search_result_docs is None:
            # (error) if vector search finds no relevant context.
            return (doc_text, Error(message=ERR_ANALYSIS_FAILED))
        else:
            legal_context = join_similarity_search_results(search_result_docs)
            return (doc_text, legal_context)


    async def process_inputs(self, input: tuple[str, str]) -> tuple[str, str]:
        """Process inputs by running through analysis."""
        (doc_text, legal_context) = input

        # Invoke llm with prompt value.
        response = await self.ainvoke(doc_text, legal_context)

        return (doc_text, response)


    def post_process_outputs(self, output: tuple[str, str | Error]) -> dict[str, str]:
        """Post-process outputs to format data structure after completing analysis."""
        (doc_text, response) = output

        obj = {"text": doc_text}
        if type(response) == str:
            try:
                compliance_analysis = parse_compliance_analysis(extract_json_obj(response))
                obj["compliance_analysis"] = compliance_analysis
            except Exception as error:
                obj["error"] = ERR_JSON_PARSER.format(cause=error)
        elif type(response) == Error:
            obj["error"] = response.message
        else:
            obj["error"] = str(response)

        return obj