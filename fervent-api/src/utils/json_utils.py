def extract_json_obj(markdown_str: str):
    """Extracts a string JSON object from a Markdown formatted text."""

    start = "```json"
    end = "```"

    if markdown_str.find(start) == -1:
        return markdown_str

    (before_sep_start, sep_start, after_sep_start) = markdown_str.partition(start)
    (before_sep_end, sep_end, after_sep_end) = after_sep_start.partition(end)

    json_str = before_sep_end
    return json_str
