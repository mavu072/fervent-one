from langchain_core.documents import Document


def join_similarity_search_results(result_docs: list[tuple[Document, float]]):
    """Joins the matched result documents into a single string"""

    joined_text = "\n\n>>>>>\n\n".join([doc.page_content for doc, _score in result_docs])

    return joined_text


def get_content_sources(docs: list[tuple[Document, float]]):
    """Returns a list of paragraphs used as sources for the response."""

    sources = [[f'Source: {doc.metadata.get("source", None)}, Quoted text: {doc.page_content}'] for doc, _score in docs]

    return sources