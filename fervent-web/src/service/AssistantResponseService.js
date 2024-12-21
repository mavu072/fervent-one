const BASE_URL = import.meta.env.VITE_ASSISTANT_API_URL;

/**
 * Sends a request to the Assistant API with the user message.
 * Then returns the API response.
 * @param {String} userMsg
 * @returns Response
 */
const getAssistantResponse = async (userMsg) => {
    const apiEndpoint = `${BASE_URL}/assistant/messages/send`;
    const reqPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: userMsg })
    };

    // Send API Request
    await fetch(apiEndpoint, reqPayload)
        .then(async (response) => {
            const responseJson = await response.json();
            // Check response
            if (response.ok) {
                // Handle response
                let response = responseJson.text;
                let sources = null;
                if (responseJson.sources) {
                    sources = responseJson.sources;
                }
                return { response, sources }
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
        });

    return { response: "Your message could not be processed." }
}


export { getAssistantResponse }