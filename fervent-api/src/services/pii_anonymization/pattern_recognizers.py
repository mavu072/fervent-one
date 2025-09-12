from presidio_analyzer import Pattern, PatternRecognizer

# PII Recognizers and Patterns for:
# - South African ID - 13 numeric digits long.
# - South African Income Tax reference number - 10 numeric digits long. Can only start with 0, 1, 2, 3 or 9 e.g. 0123456789.

# Define the patterns:
south_african_id_pattern = Pattern(
    name="south_african_id_pattern",
    regex="\\d{13}",
    score=1,
)

south_african_tax_number_pattern = Pattern(
    name="south_african_tax_number_pattern",
    regex="\\d{10}",
    score=1,
)

time_pattern = Pattern(
    name="time_pattern",
    regex="(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)",
    score=1,
)

# Define the recognizers:
south_african_id_recognizer = PatternRecognizer(
    supported_entity="SOUTH_AFRICAN_ID", patterns=[south_african_id_pattern]
)

south_african_tax_number_recognizer = PatternRecognizer(
    supported_entity="SOUTH_AFRICAN_TAX_NUMBER",
    patterns=[south_african_tax_number_pattern],
)

time_recognizer = PatternRecognizer(
    supported_entity="TIME", patterns=[time_pattern]
)