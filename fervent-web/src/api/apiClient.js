/**
 * API Client for making HTTP requests.
 * @param {object} requestConfig Request Configuration
 * @param {string} requestConfig.url Request URL
 * @param {string} requestConfig.method HTTP Method
 * @param {object} requestConfig.headers (Optional) Request Headers
 * @param {string} requestConfig.body (Optional) Request Body as a JSON string
 * @returns Reponse
 */
async function apiClient(requestConfig) {
    if (!requestConfig.url) {
        throw new Error("URL is required");
    }

    if (!requestConfig.method) {
        throw new Error("HTTP Method is required");
    }
    const response = await fetch(requestConfig.url, requestConfig)
                            .then((response) => {
                                return response;
                            }).catch(error => {
                                throw new Error(error?.message || "API Client Error");
                            });
    return response;
}

export default apiClient;