import apiClient from "./apiClient";

const BASE_URL = import.meta.env.VITE_ASSISTANT_API_URL;

/**
 * Sends a request to the Assistant API with the user message.
 * @param {string} userMessage New user message.
 * @param {Array<object>} chatHistory Previous messages.
 * @returns Response
 */
const getAssistantResponse = async (userMessage, chatHistory = []) => {
    if (!userMessage) {
        throw new Error("User message is required");
    }

    const config = {
        url: `${BASE_URL}/llm/chat`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: userMessage,
            'prev_messages': chatHistory
        }),
    };

    try {
        const response = await apiClient(config);
        const data = await response.json();

        if (response.ok) {
            // Handle OK response
            return { response: data.response.content, sources: data.sources, };
        } else {
            // Handle error response
            throw new Error(data.error ? data.error : response.statusText);
        }
    } catch (error) {
        console.log("Assistant API Error", error);
        return { response: "Your message could not be processed." };
    }
}


export { getAssistantResponse }