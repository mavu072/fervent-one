from langchain_experimental.data_anonymizer import PresidioReversibleAnonymizer
from langchain.schema.runnable import RunnableMap, RunnablePassthrough, RunnableLambda, Runnable
from langchain.schema.output_parser import StrOutputParser
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.callbacks.tracers import LangChainTracer
from langchain_openai import ChatOpenAI
from typing import Callable, Dict, Any

from src.services.pii_anonymization.pattern_recognizers import (
    south_african_id_recognizer,
    time_recognizer,
)
from src.services.pii_anonymization.operators import new_operators
from src.services.vectorstores.chroma import chroma_retriever
from src.services.llm.prompt_templates import (
    SYSTEM_INSTRUCTION_PROMPT,
    QA_PROMPT_TEMPLATE,
    CONTEXTUALISE_CHAT_HISTORY_PROMPT,
)

# 1. Create a prompt instructed to produce an answer based on the context.
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", SYSTEM_INSTRUCTION_PROMPT),
        MessagesPlaceholder("chat_history"),
        ("human", QA_PROMPT_TEMPLATE),
    ]
)

# 2. Create a prompt instructed to produce a rephrased question based on the user's last question, but referencing previous messages.
contextualize_history_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", CONTEXTUALISE_CHAT_HISTORY_PROMPT),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)


def history_anonymizer(chat_history: list[tuple[str, str]], anonymize_fn: Callable[[str], str]):
    anonymized_history = []
    for role, msg in chat_history:
        anonymized_msg = anonymize_fn(msg)
        anonymized_history.append((role, anonymized_msg))
    return anonymized_history


class QuestionAnswerChain:

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

        # 2. Initialize Vector Store retriever
        base_retriever = chroma_retriever()

        # 3. Chat model
        self.model = ChatOpenAI(temperature=0.3)

        # 4. History-aware retriever
        self.history_aware_retriever = create_history_aware_retriever(
            self.model,
            base_retriever,
            contextualize_history_prompt,
        )

        # 5. QA chain (retrieval + LLM)
        self.documents_chain = create_stuff_documents_chain(self.model, qa_prompt)
        self.retrieval_chain = create_retrieval_chain(
            self.history_aware_retriever, self.documents_chain
        )

        # Anonymize inputs
        _inputs = RunnableMap(
            {
                "input": RunnablePassthrough(),
                "anonymized_input": RunnableLambda(
                    lambda x: self.anonymizer.anonymize(x["input"])
                ),
                "anonymized_history": RunnableLambda(
                    lambda x: history_anonymizer(x["chat_history"], self.anonymizer.anonymize)
                ),
            }
        )

        # 6. Full anonymizer-aware input chain
        self.full_chain: Runnable[Dict[str, Any], str] = (
            _inputs
            | RunnableLambda(self._restructure_inputs_for_retrieval)
            | self.retrieval_chain # Invoke retrieval chain with inputs
            | RunnableLambda(lambda output: output["answer"]) # Get answer from dictionary output
            | StrOutputParser() # Parse output to string
            | RunnableLambda(self.anonymizer.deanonymize) # Deanonymize string output
        )

        # ... Last step is to call invoke (with a question) on the chain with deanonymization.

    def _restructure_inputs_for_retrieval(self, inputs: dict) -> dict:
        return {
            "input": inputs["anonymized_input"],
            "chat_history": inputs["anonymized_history"],
        }

    def invoke(self, input: str, chat_history: list[tuple[str, str]] | None = None) -> str:
        return self.full_chain.invoke(
            {
                "input": input,
                "chat_history": chat_history or []
            },
            config={"callbacks": [self.tracer]}
        )

    async def ainvoke(self, input: str, chat_history: list[tuple[str, str]] | None = None) -> str:
            return await self.full_chain.ainvoke(
                {
                    "input": input,
                    "chat_history": chat_history or []
                },
                config={"callbacks": [self.tracer]}
            )