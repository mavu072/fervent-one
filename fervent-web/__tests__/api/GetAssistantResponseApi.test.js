import apiClient from "../../src/api/apiClient";
import { getAssistantAnalysisResponse } from "../../src/api/GetAssistantResponseApi";

jest.mock("../../src/api/apiClient");
jest.mock("../../src/util/apiUtil", () => {
    return {
        __esModule: true,
        default: jest.fn(() => 'mocked'),
        getApiUrl: jest.fn(() => "http://localhost:3000")
    };
});

describe("getAssistantAnalysisResponse", () => {
    let uuid = "testJest";
    let file = new File(["Hello world"], "hello.txt", { type: "text/plain" });

    it("should make a request with a file.", async () => {
        apiClient.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ result: [] }),
        }));

        let data = await getAssistantAnalysisResponse(uuid, file);

        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(data).toHaveProperty('result', []);
    });

    it("should throw an error when a file is missing.", async () => {
        await expect(async () => getAssistantAnalysisResponse(uuid, null)).rejects.toThrow("File is required");
    });

    it("should throw an error when a unique id is missing.", async () => {
        await expect(async () => getAssistantAnalysisResponse(undefined, file)).rejects.toThrow("User Id is required");
    });
});