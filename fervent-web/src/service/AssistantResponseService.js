const BASE_URL = import.meta.env.VITE_ASSISTANT_API_URL;

/**
 * Sends a request to the Assistant API with the user message.
 * Then returns the API response.
 * @param {string} userMsg User query
 * @param {Array<object>} chatHistory Previous messages list
 * @returns Response
 */
const getAssistantResponse = async (userMsg, chatHistory = []) => {
    let result = null;

    const apiEndpoint = `${BASE_URL}/llm/chat`;
    const reqPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            message: userMsg,
            "prev_messages": chatHistory
        })
    };

    // Send API Request
    await fetch(apiEndpoint, reqPayload)
        .then(async (response) => {
            const responseJson = await response.json();
            // Check response
            if (response.ok) {
                // Handle response
                let response = responseJson.response.content;
                let sources = null;
                if (responseJson.sources) {
                    sources = responseJson.sources;
                }
                result = { response, sources }
            } else {
                // Handle error response
                if (responseJson.error) {
                    console.log(responseJson.error);
                } else {
                    throw new Error(response.statusText);
                }
            }
        }).catch(error => {
            console.log(error);
            result = { response: "Your message could not be processed." }
        });

    return result;
}


export { getAssistantResponse }