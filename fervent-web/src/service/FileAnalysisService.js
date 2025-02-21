import { getAssistantAnalysisResponse } from "../api/GetAssistantResponseApi";

class FileAnalysisService {

    /**
     * Class for analysing files.
     */
    constructor() {}

    /**
     * Posts the file for analysis.
     * @param {string} userId 
     * @param {File} file
     * @returns Analysis
     */
    async analyseFile(userId, file) {
        const response = await getAssistantAnalysisResponse(userId, file);
        return response;
    }
}

export default FileAnalysisService;