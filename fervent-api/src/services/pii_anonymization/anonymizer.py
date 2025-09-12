from langchain_experimental.data_anonymizer import PresidioReversibleAnonymizer

from src.services.pii_anonymization.pattern_recognizers import (
    south_african_id_recognizer,
    time_recognizer
)
from src.services.pii_anonymization.operators import new_operators


class DataAnonymizer:

    def __init__(self):
        self.anonymizer = PresidioReversibleAnonymizer(
            add_default_faker_operators=True,
            faker_seed=42,
        )

        self.anonymizer.add_recognizer(south_african_id_recognizer)
        self.anonymizer.add_recognizer(time_recognizer)

        self.anonymizer.add_operators(new_operators)

    def anonymize(self, text):
        return self.anonymizer.anonymize(text)

    def anonymizer_mapping(self):
        return self.anonymizer.anonymizer_mapping

    def reset_anonymizer_mapping(self):
        self.anonymizer.reset_deanonymizer_mapping()
