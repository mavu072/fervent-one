from faker import Faker
from presidio_anonymizer import OperatorConfig

fake = Faker()


def fake_south_african_id(_=None):
    return fake.bothify(text="#############")


def fake_south_african_tax_number(_=None):
    return fake.bothify(text="##########")


def fake_time(_ = None):
    return fake.time(pattern="%I:%M %p")


new_operators = {
    "SOUTH_AFRICAN_ID": OperatorConfig("custom", {"lambda": fake_south_african_id}),
    # "SOUTH_AFRICAN_TAX_NUMBER": OperatorConfig(
    #     "custom", {"lambda": fake_south_african_tax_number}
    # ),
    "TIME": OperatorConfig("custom", { "lambda": fake_time }),
}
