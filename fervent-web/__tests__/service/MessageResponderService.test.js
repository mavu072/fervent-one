import apiClient from "../../src/api/apiClient";
import FileRepository from "../../src/repository/FileRepository";
import MessageRepository from "../../src/repository/MessageRepository";
import ReportRepository from "../../src/repository/ReportRepository";
import FileService from "../../src/service/FileService";
import MessageResponderService from "../../src/service/MessageResponderService";
import MessageService from "../../src/service/MessageService";
import ReportService from "../../src/service/ReportService";

jest.mock("../../src/api/apiClient", () => {
    return {
        __esModule: true,
        default: jest.fn(() => 'mocked'),
        getApiUrl: jest.fn(() => "http://localhost:3000"),
        apiClient: jest.fn(() => Promise.resolve()),
    };
});
jest.mock("../../src/firebase/firebaseUtil", () => {
    return {
        __esModule: true,
        getServerTimestamp: jest.fn(() => ({
            toDate: () => (new Date())
        })),
    }
})
jest.mock("../../src/repository/BaseRepository", () => {
    return class BaseRepository {
        constructor() { }

        save(doc) {
            return Promise.resolve(doc);
        }

        get() {
            return Promise.resolve({});
        }
    }
});

const user = { uid: 'jesttest', email: 'johndoe@test.com' };
const app = {};

const messageRepository = new MessageRepository(app, user);
const fileRepository = new FileRepository(app, user);
const reportRepository = new ReportRepository(app, user);

const messageResponder = new MessageResponderService({
    userId: user.uid,
    messageService: new MessageService(messageRepository),
    fileService: new FileService(fileRepository),
    reportService: new ReportService(reportRepository)
});


describe("MessageResponderService.saveHumanMessage", () => {
    
    it("should save a human message.", async () => {
        let msg = "Hello";
        let result = await messageResponder.saveHumanMessage(msg);
        expect(result).toHaveProperty("content", msg);
        expect(result).toHaveProperty("createdAt");
    });

    it("should handle an empty message, gracefully.", async () => {
        let msg = "";
        let result = await messageResponder.saveHumanMessage(msg);
        expect(result).toBe(null);
    });

    it("should handle a null/undefined message, gracefully.", async () => {
        let msg = null;
        let result = await messageResponder.saveHumanMessage(msg);
        expect(result).toBe(null);

        msg = undefined;
        result = await messageResponder.saveHumanMessage(msg);
        expect(result).toBe(null);
    });
});

describe("MessageResponderService.saveSystemMessage", () => {

    it("should save a system message.", async () => {
        let msg = "Hello";
        let result = await messageResponder.saveSystemMessage({ content: msg, sources: [] });
        expect(result).toHaveProperty("content", msg);
        expect(result).toHaveProperty("sources", []);
        expect(result).toHaveProperty("createdAt");
    });

    it("should save a system message with sources.", async () => {
        let msg = "Hello";
        let sources = [{ title: "Hello World", link: "https://hello.world" }];
        let result = await messageResponder.saveSystemMessage({ content: msg, sources: sources });
        expect(result).toHaveProperty("content", msg);
        expect(result).toHaveProperty("sources", sources);
        expect(result).toHaveProperty("createdAt");
    });

    it("should save a system message with null/undefined sources.", async () => {
        let msg = "Hello";
        let result = await messageResponder.saveSystemMessage({ content: msg, sources: null });
        expect(result).toHaveProperty("content", msg);
        expect(result).toHaveProperty("sources", null);
        expect(result).toHaveProperty("createdAt");

        result = await messageResponder.saveSystemMessage({ content: msg, sources: undefined });
        expect(result).toHaveProperty("content", msg);
        expect(result).toHaveProperty("sources", null);
        expect(result).toHaveProperty("createdAt");
    });

    it("should handle an empty message, gracefully.", async () => {
        let msg = "";
        let result = await messageResponder.saveSystemMessage({ content: msg });
        expect(result).toBe(null);
    });

    it("should handle a null/undefined message, gracefully.", async () => {
        let msg = null;
        let result = await messageResponder.saveSystemMessage({ content: msg });
        expect(result).toBe(null);

        msg = undefined;
        result = await messageResponder.saveSystemMessage({ content: msg });
        expect(result).toBe(null);
    });
});

describe("MessageResponderService.saveAttachmentAsMessage", () => {

    it("should save an attachment as a message.", async () => {
        let attachment = {
            name: "hello.txt",
            size: 1,
            type: "text/plain",
        };
        let result = await messageResponder.saveAttachmentAsMessage(attachment);
        expect(result).toHaveProperty("attachment", attachment);
        expect(result).toHaveProperty("createdAt");
    });
});

describe("MessageResponderService.saveHumanFiles", () => {

    it("should save all files.", async () => {
        let files = [
            new File(["Hello world"], "hello.txt", { type: "text/plain" }),
            new File(["Foo bar"], "foo.txt", { type: "text/plain" }),
        ];
        let result = await messageResponder.saveHumanFiles(files);
        expect(result).toHaveLength(files.length);
    });

    it("should handle empty/null/undefined files, gracefully.", async () => {
        let result = await messageResponder.saveHumanFiles([]);
        expect(result).toBe(null);

        result = await messageResponder.saveHumanFiles(null);
        expect(result).toBe(null);

        result = await messageResponder.saveHumanFiles(undefined);
        expect(result).toBe(null);
    });
});

describe("MessageResponderService.saveAttachment", () => {

    it("should save an attachment.", async () => {
        let attachment = {
            name: "hello.txt",
            size: 1,
            type: "text/plain",
        };
        let result = await messageResponder.saveAttachment(attachment);
        expect(result).toHaveProperty("name", attachment.name);
        expect(result).toHaveProperty("size", attachment.size);
        expect(result).toHaveProperty("type", attachment.type);
        expect(result).toHaveProperty("createdAt");
    });
});

describe("MessageResponderService.getSystemResponse", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get and save the system response.", async () => {
        let msg = "Write me an email.";
        let response = "Dear Foo, ...";
        let chatHistory = [
            { role: "human", content: "Hello" },
            { role: "ai", content: "Hi, how can I assist you?" }
        ];

        apiClient.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                "response": { "content": response },
                "sources": null,
            }),
        }));

        let result = await messageResponder.getSystemResponse(msg, chatHistory);
        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(result).toHaveProperty("content", response);
        expect(result).toHaveProperty("sources", null);
    });
});

describe("MessageResponderService.uploadFiles", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should upload files to system.", async () => {
        let files = [
            new File(["Hello world"], "hello.txt", { type: "text/plain" }),
            new File(["Foo bar"], "foo.txt", { type: "text/plain" }),
        ];

        apiClient.mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ "success": true, "uploaded_documents": files.length, }),
        }));

        let result = await messageResponder.uploadFiles(files);
        expect(apiClient).toHaveBeenCalledTimes(1);
        expect(result).toHaveProperty("success", true);
        expect(result).toHaveProperty("uploaded_documents", files.length);
    });
});