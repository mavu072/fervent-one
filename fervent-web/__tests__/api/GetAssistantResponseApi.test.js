import apiClient from "../../src/api/apiClient";
import { getAssistantAnalysisResponse, uploadFilesToAssistant } from "../../src/api/GetAssistantResponseApi";

jest.mock("../../src/api/apiClient", () => {
    return {
        __esModule: true,
        default: jest.fn(() => 'mocked'),
        getApiUrl: jest.fn(() => "http://localhost:3000"),
        apiClient: jest.fn(() => Promise.resolve()),
    };
});

describe("uploadFilesToAssistant", () => {
    let uuid = "testJest";
    let files = [
        new File(["Hello world"], "hello.txt", { type: "text/plain" }),
        new File(["Foo bar"], "foo.txt", { type: "text/plain" }),
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should make a request with files.", async () => {
        apiClient.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ "success": true, "uploaded_documents": files.length, }),
        }));

        let data = await uploadFilesToAssistant(uuid, files);

        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(data).toHaveProperty("success", true);
        expect(data).toHaveProperty("uploaded_documents", files.length);
    });

    it("should handle an error response from the api.", async () => {
        apiClient.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "error": "API error",
            }),
        }));

        let data = await uploadFilesToAssistant(uuid, files);

        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(data).toHaveProperty("error");
    });

    it("should throw an error when a file is missing.", async () => {
        await expect(async () => uploadFilesToAssistant(uuid, null)).rejects.toThrow("File is required");
        await expect(async () => uploadFilesToAssistant(uuid, [])).rejects.toThrow("File is required");
    });

    it("should throw an error when a unique id is missing.", async () => {
        await expect(async () => uploadFilesToAssistant(undefined, files)).rejects.toThrow("User Id is required");
    });
});

describe("getAssistantAnalysisResponse", () => {
    let uuid = "testJest";
    let file = new File(["Hello world"], "hello.txt", { type: "text/plain" });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should make a request with a file.", async () => {
        apiClient.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "result": [
                    {
                        "text": "Hello World",
                        "compliance_analysis": {
                            "non_compliant_sections": [],
                            "compliant_sections": [],
                        },
                    },
                ],
            }),
        }));

        let data = await getAssistantAnalysisResponse(uuid, file);

        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(data).toHaveProperty("result");
        expect(data.result[0]).toHaveProperty("text");
        expect(data.result[0]).toHaveProperty("compliance_analysis.non_compliant_sections");
        expect(data.result[0]).toHaveProperty("compliance_analysis.compliant_sections");
    });

    it("should handle an error response from the api.", async () => {
        apiClient.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "error": "API error",
            }),
        }));

        let data = await getAssistantAnalysisResponse(uuid, file);

        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(data).toHaveProperty("error");
    });

    it("should throw an error when a file is missing.", async () => {
        await expect(async () => getAssistantAnalysisResponse(uuid, null)).rejects.toThrow("File is required");
    });

    it("should throw an error when a unique id is missing.", async () => {
        await expect(async () => getAssistantAnalysisResponse(undefined, file)).rejects.toThrow("User Id is required");
    });
});