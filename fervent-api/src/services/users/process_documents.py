
"""
Handling user files.

1. User sends messages + history + file.
2. File is saved to temp folder.
3. File loaded from temp into a user's private vectorstore collection identified by user unique Id.
4. File deleted from temp after loading into vectorstore.
5. File is querying using a similarity search.
6. The result docs are injected into the "human" prompt as additional context, 
    using a specific prompt template for handling files.
7. The response is returned.
8. When a new message is sent, the private collection is also queried,
    for additional context when responding to new messages.

Checks: Only query the private collection, if it exists,
    if it does not exist use the conversational prompt. 
    if it does exist use the conversational files prompt.

Note: Do not create a new route, rather add to existing conversational route,
with a different handler when the arguments contain files.
"""