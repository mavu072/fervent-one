import MessageService from "./MessageService";
import FileService from "./FileService";
import ReportService from "./ReportService";
import MessageFactory from "../factory/MessageFactory";
import FileFactory from "../factory/FileFactory";
import ReportFactory from "../factory/ReportFactory";
import { ASSISTANT, USER } from "../constants/messageConstants";
import { getServerTimestamp } from "../firebase/firebaseUtil";
import { getAssistantResponse, uploadFilesToAssistant } from "../api/GetAssistantResponseApi";

/**
 * A service class that encapsulates the functionality for sending and recieving messages and files between the client and API.
 */
class MessageResponderService {

    /**
     * Abstract class for handling new user messages and files.
     * @param {object} params Required values and service classes.
     * @param {string} params.userId
     * @param {MessageService} params.messageService
     * @param {FileService} params.fileService
     * @param {ReportService} params.reportService 
     */
    constructor({ userId, messageService, fileService, reportService }) {
        this.userId = userId;
        // Factory classes.
        this.messageFactory = new MessageFactory();
        this.fileFactory = new FileFactory();
        this.reportFactory = new ReportFactory();
        // Service classes.
        this.messageService = messageService;
        this.fileService = fileService;
        this.reportService = reportService;
    }

    /**
     * Save user message.
     * @param {string} userMsg User message.
     * @returns
     */
    saveHumanMessage(userMsg) {
        if (!userMsg || userMsg.trim() === "") return null;

        // Create.
        const msg = this.messageFactory.createMessage({
            content: userMsg,
            userId: this.userId,
            role: USER,
            createdAt: getServerTimestamp()
        });
        // Save.
        return this.messageService.save(msg);
    }

    /**
     * Save system message.
     * @param {object} systemMsg System message.
     * @param {string} systemMsg.content Content.
     * @param {Array | null} systemMsg.sources (Optional) Sources.
     * @returns Promise
     */
    saveSystemMessage({ content, sources = null }) {
        if (!content || content.trim() === "") return null;

        // Create assistant message.
        const msg = this.messageFactory.createMessage({
            content: content,
            sources: sources,
            userId: this.userId,
            role: ASSISTANT,
            createdAt: getServerTimestamp()
        });
        // Save assistant message.
        return this.messageService.save(msg);
    }

    /**
     * Saves a user file attachment as a message.
     * @param {object} file File.
     * @param {string} file.name Filename.
     * @param {number} file.size File size.
     * @param {string} file.type File mime.
     * @returns Promise
     */
    saveAttachmentAsMessage({ name, size, type}) {
        // Create.
        const msg = this.messageFactory.createMessage({
            attachment: { name: name, size: size, type: type },
            userId: this.userId,
            role: USER,
            createdAt: getServerTimestamp()
        })
        // Save.
        return this.messageService.save(msg);
    }

    /**
     * Saves a file attachment.
     * @param {object} file File.
     * @param {string} file.name Filename.
     * @param {number} file.size File size.
     * @param {string} file.type File mime.
     * @param {string} file.content (Optional) File content as a string.
     * @returns Promise
     */
    saveAttachment({ name, size, type, content = null}) {
        // Create.
        const attachment = this.fileFactory.createFile({
            name: name,
            size: size,
            type: type,
            content: content,
            createdAt: getServerTimestamp()
        });
        // Save.
        return this.fileService.save(attachment);
    }

    /**
     * Save user uploaded files.
     * @description Records uploaded files as messages in messages collection.
     * @param {Array<File>} uploadedFiles 
     * @returns Promise
     */
    saveHumanFiles(uploadedFiles) {
        if (!uploadedFiles || uploadedFiles.length === 0) return null;

        // Create.
        const savedMsgs = uploadedFiles.map(file => this.saveAttachmentAsMessage(file));
        // Save.
        return Promise.all([...savedMsgs]);
    }

    /**
     * Makes an API request to get assistant response and saves it.
     * @param {string} userMsg 
     * @param {Array} chatHistory 
     * @returns Promise
     */
    async getSystemResponse(userMsg, chatHistory) {
        if (!userMsg || userMsg.trim() === "") return null;

        const { response, sources } = await getAssistantResponse(this.userId, userMsg, chatHistory);
        return this.saveSystemMessage({ content: response, sources: sources })
    }

    /**
     * Makes an API request to upload files to assistant.
     * @param {Array<File>} uploadedFiles Files to upload.
     * @returns Promise
     */
    async uploadFiles(uploadedFiles) {
        if (!uploadedFiles || uploadedFiles.length === 0) return null;
        
        return uploadFilesToAssistant(this.userId, uploadedFiles);
    }
}

export default MessageResponderService;