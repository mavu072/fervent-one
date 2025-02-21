from src.utils.json_utils import extract_json_obj

import json


def test_extract_json_obj():
    # Markdown string.
    md_str = """```json
    {
        "foo": "bar"
    }
    ```
    """
    # Embedded Markdown string.
    emb_md_str = """Here is the json:
    ```json
    {
        "foo": "bar"
    }
    ```
    """
    # Plain string.
    plain_str = """
    {
        "foo": "bar"
    }
    """

    assert json.loads(extract_json_obj(md_str)) == { "foo": "bar" }
    assert json.loads(extract_json_obj(emb_md_str)) == { "foo": "bar" }
    assert json.loads(extract_json_obj(plain_str)) == { "foo": "bar" }
