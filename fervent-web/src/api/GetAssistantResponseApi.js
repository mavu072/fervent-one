import { getApiUrl } from "../util/apiUtil";
import apiClient from "./apiClient";

/**
 * Sends a request to the Assistant API with the user message.
 * @param {string} userId Unique identifier for tracking user data stored on the API server.
 * @param {string} userMessage User message.
 * @param {Array<object>} chatHistory Previous messages.
 * @returns Response
 */
export const getAssistantResponse = async (userId, userMessage, chatHistory = []) => {
    if (!userId) {
        throw new Error("User Id is required");
    }

    if (!userMessage) {
        throw new Error("User message is required");
    }

    const baseUrl = getApiUrl();
    const config = {
        url: `${baseUrl}/v1/llm/chat?uuid=${userId}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'message': {
                'role': 'human',
                'content': userMessage
            },
            'prev_messages': chatHistory
        }),
    };

    try {
        const response = await apiClient(config);
        const data = await response.json();

        if (response.ok) {
            return { response: data.response.content, sources: data.sources, };
        } else {
            throw new Error(data.error ? data.error : response.statusText);
        }
    } catch (error) {
        return { response: "Your message could not be processed. Please try again." };
    }
}

/**
 * Sends a request to the Assistant API with the uploaded file.
 * @param {string} userId Unique identifier for tracking user data stored on the API server.
 * @param {File} file Uploaded file.
 * @returns Response
 */
export const getAssistantAnalysisResponse = async (userId, file) => {
    if (!userId) {
        throw new Error("User Id is required");
    }

    if (!file) {
        throw new Error("File is required");
    }

    const formData = new FormData();
    formData.append("file", file, file.name);

    const baseUrl = getApiUrl();
    const config = {
        url: `${baseUrl}/v1/llm/compliance-analysis?uuid=${userId}`,
        method: 'POST',
        headers: { }, // Set empty headers to allow browser to set file headers.
        body: formData,
    };

    const response = await apiClient(config);
    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error(data.error ? data.error : response.statusText);
    }
}