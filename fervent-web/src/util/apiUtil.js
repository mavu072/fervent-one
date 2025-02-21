
/**
 * Gets API base URL.
 * @returns {string} API URL
 */
export function getApiUrl() {
    const baseUrl = import.meta.env.VITE_ASSISTANT_API_URL;
    return baseUrl;
}