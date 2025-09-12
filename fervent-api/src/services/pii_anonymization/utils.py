# Util function for coloring the PII markers
# Note: It will not be visible on documentation page, only in the notebook.

import re

def print_colored_pii(string: str):
    colored_string = re.sub(
        r"(<[^>]*>)", lambda m: "\033[31m" + m.group(1) + "\033[0m", string
    )
    print(colored_string)
