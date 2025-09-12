from src.services.pii_anonymization.anonymizer import DataAnonymizer
from src.services.pii_anonymization.utils import print_colored_pii

import pprint

document_content = """Date: May 1, 2025
Witness: Ayanda Mbeki 
Subject: Testimony Regarding the loss of cellphone and wallet

Testimony Content:

Hello, Officer

My name is Ayanda Mbeki and on May 1, 2025, my cellphone and wallet were all stolen in the vicinity of Gqeberha during a hike trip.

This wallet contains some very important things to me.

Firstly, the wallet contains my credit card with number 4111 1111 1111 1111, which is registered under my name and linked to my bank account, 1234567890.

Additionally, the wallet had my South African driver's license with number 5002010272999 issued to my name.

What's more, I had my South African identity card there, with the number 5002010272082.

I would like this data to be secured and protected in all possible ways. I believe it was stolen at 9:30 AM.

In case any information arises regarding my wallet, please reach out to me on my phone number, 0723456789, or through my personal email, ayanda.mb@gmail.com.

Please consider this information to be highly confidential and respect my privacy.

The banks have been informed about the stolen credit card and necessary actions have been taken from their end. They will be reachable at their official email, support@bank.com.

My representative there is Amahle Ndlovu (her business phone: +2711-000-6789).

Thank you for your assistance,

Ayanda Mbeki"""


def test_anonymizer():
    anonymizer = DataAnonymizer()
    anonymized_text = anonymizer.anonymize(document_content)
    print_colored_pii(anonymized_text)
    pprint.pprint(anonymizer.anonymizer_mapping())

    assert anonymized_text.find("Ayanda Mbeki") == -1