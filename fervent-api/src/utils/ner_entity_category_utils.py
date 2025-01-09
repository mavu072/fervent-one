
# Supported named entities
PERSON = "PERSON"           # People, including fictional.
NORP = "NORP"               # Nationalities or religious or political groups.
FAC = "FAC"                 # Buildings, airports, highways, bridges, etc.
ORG = "ORG"                 # Companies, agencies, institutions, etc.
GPE = "GPE"                 # Countries, cities, states.
LOC = "LOC"                 # Non-GPE locations, mountain ranges, bodies of water.
PRODUCT = "PRODUCT"         # Objects, vehicles, foods, etc. (Not services.)
EVENT = "EVENT"             # Named hurricanes, battles, wars, sports events, etc.
WORK_OF_ART = "WORK_OF_ART" # Titles of books, songs, etc.
LAW = "LAW"                 # Named documents made into laws.
LANGUAGE = "LANGUAGE"       # Any named language.
DATE = "DATE"               # Absolute or relative dates or periods.
TIME = "TIME"               # Times smaller than a day.
PERCENT = "PERCENT"         # Percentage, including ”%“.
MONEY = "MONEY"             # Monetary values, including unit.
QUANTITY = "QUANTITY"       # Measurements, as of weight or distance.
ORDINAL = "ORDINAL"         # “first”, “second”, etc.
CARDINAL = "CARDINAL"       # Numerals that do not fall under another type.

# List of entity categories.
entity_categories = [
    PERSON, NORP, FAC, ORG, GPE, LOC, PRODUCT, EVENT, WORK_OF_ART,
    LAW, LANGUAGE, DATE, TIME, PERCENT, MONEY, QUANTITY, ORDINAL, CARDINAL
]