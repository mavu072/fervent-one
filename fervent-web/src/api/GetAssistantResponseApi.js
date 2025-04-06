import apiClient, { getApiUrl } from "./apiClient";

/**
 * Sends a request to the Assistant API with the user message.
 * @param {string} uuid Unique identifier for tracking user data stored on the API server.
 * @param {string} message User message.
 * @param {Array<object>} chatHistory Previous messages.
 * @returns Response
 */
export const getAssistantResponse = async (uuid, message, chatHistory = []) => {
    if (!uuid) {
        throw new Error("User Id is required");
    }

    if (!message) {
        throw new Error("User message is required");
    }

    const baseUrl = getApiUrl();
    const config = {
        url: `${baseUrl}/v1/llm/chat?uuid=${uuid}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'message': {
                'role': 'human',
                'content': message
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
 * @param {string} uuid Unique identifier for tracking user data stored on the API server.
 * @param {File} file Uploaded file.
 * @returns Response
 */
export const getAssistantAnalysisResponse = async (uuid, file) => {
    if (!uuid) {
        throw new Error("User Id is required");
    }

    if (!file) {
        throw new Error("File is required");
    }

    const formData = new FormData();
    formData.append("file", file, file.name);

    const baseUrl = getApiUrl();
    const config = {
        url: `${baseUrl}/v1/llm/compliance-analysis?uuid=${uuid}`,
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

/**
 * Sends a request to the Assistant API with the uploaded files to be saved to a collection associated with the user.
 * @param {string} uuid Unique identifier for tracking user data stored on the API server.
 * @param {Array<File>} files Uploaded files.
 * @returns Response
 */
export const uploadFilesToAssistant = async (uuid, files) => {
    if (!uuid) {
        throw new Error("User Id is required");
    }

    if (!files || files.length == 0) {
        throw new Error("File is required");
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file, file.name));

    const baseUrl = getApiUrl();
    const config = {
        url: `${baseUrl}/v1/vector/collections/upload?collection_name=${uuid}`,
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