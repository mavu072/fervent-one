from langchain.schema import Document

def join_similarity_search_results(result_docs:list[Document]):
    """Joins the matched result documents into a single string"""

    joined_text = "\n\n>>>>>\n\n".join([doc.page_content for doc, _score in result_docs])

    return joined_text