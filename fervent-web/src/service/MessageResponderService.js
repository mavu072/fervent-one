import MessageService from "./MessageService";
import FileService from "./FileService";
import MessageFactory from "../factory/MessageFactory";
import FileFactory from "../factory/FileFactory";
import { ASSISTANT, OPEN_INTERNAL, USER } from "../constants/messageConstants";
import { getServerTimestamp } from "../firebase/firebaseUtil";
import { getAssistantResponse } from "../api/GetAssistantResponseApi";
import { exampleComplianceReport } from "../api/examples/complianceReportExample";
import ReportService from "./ReportService";
import ReportFactory from "../factory/ReportFactory";
import { TITLE_COMPLIANCE_REPORT_LINK } from "../constants/reportConstants";

class MessageResponderService {

    /**
     * Abstract class for handling new user messages and files.
     * @param {object} params Required values and service classes.
     * @param {*} params.userId
     * @param {MessageService} params.messageService
     * @param {FileService} params.fileService
     * @param {ReportService} params.reportService 
     */
    constructor({ userId, messageService, fileService, reportService }) {
        this.userId = userId;
        // Factory classes.
        this.messageFactory = new MessageFactory();
        this.fileFactory = new FileFactory();
        this.reportFactory =  new ReportFactory();
        // Service classes.
        this.messageService = messageService;
        this.fileService = fileService;
        this.reportService = reportService;
    }

    /**
     * Save user message.
     * @param
     * @returns
     */
    saveHumanMessage(userMsg) {
        const msg = this.messageFactory.createMessage({
            content: userMsg,
            userId: this.userId,
            role: USER,
            createdAt: getServerTimestamp()
        });

        return this.messageService.save(msg);
    }

    /**
     * Save user uploaded files.
     * @description Records uploaded files as messages in messages collection and saves files in files collection.
     * @param {Array<File>} uploadedFiles 
     * @returns
     */
    saveHumanFiles(uploadedFiles) {
        if (uploadedFiles.length == 0) {
            return null;
        }

        const attachmentMsgList = [];
        const attachmentList = [];

        // Create messages.
        attachmentMsgList.push(...uploadedFiles.map(file =>
            this.messageFactory.createMessage({
                attachment: { name: file.name, size: file.size, type: file.type },
                userId: this.userId,
                role: USER,
                createdAt: getServerTimestamp()
            })
        ));

        // Create files.
        attachmentList.push(...uploadedFiles.map(file =>
            this.fileFactory.createFile({
                name: file.name,
                size: file.size,
                type: file.type,
                createdAt: getServerTimestamp()
            })
        ));

        // Save promises.
        const savedMsgs = attachmentMsgList.map(msg => this.messageService.save(msg));
        const savedAttachments = attachmentList.map(attachment => this.fileService.save(attachment));

        // Save messages and files.
        return Promise.all([...savedMsgs, ...savedAttachments]);
    }

    /**
     * Makes an API request to get assistant response and saves it.
     * @param {string} userMsg 
     * @param {Array} chatHistory 
     * @returns
     */
    async getAndSaveSystemResponse(userMsg, chatHistory) {
        const { response, sources } = await getAssistantResponse(userMsg, chatHistory);
        const assistantReponse = { content: response, sources };

        // Create assistant message.
        const msg = this.messageFactory.createMessage({
            content: assistantReponse.content,
            sources: assistantReponse.sources,
            userId: this.userId,
            role: ASSISTANT,
            createdAt: getServerTimestamp()
        });

        // Save assistant message.
        return this.messageService.save(msg);
    }

    /**
     * Makes an API request to get assistant response and saves it.
     * @param {Array<File>} uploadedFiles 
     * @returns
     */
    async getAndSaveSystemResponseWithFiles(uploadedFiles) {
        if (uploadedFiles.length == 0) {
            return null;
        }

        const assistantReponses = [];

        // 1. Send all uploaded files as one list. 
        console.log("Sending files to API...");
        await setTimeout(() => { }, 1000); // simulate API call.

        // 2. The API will read all as single input and return a single processing result.
        const filesResponse = exampleComplianceReport;  // Use example data to mock response.

        // 3. Save the result as a report.
        const fileReport = this.reportFactory.createComplianceReportFromPayload(filesResponse);
        const savedReport = await this.reportService.save(fileReport);
        console.log("Saved report", savedReport);

        // 4. Later, will link the report to all the files uploaded in this action.
        const reportId = savedReport.id;

        // 5. The report will contain a list of all document analysed and the content found on them.
        // 6. A Report link will be saved as an assistant message. When clicking the link, the Id will be used to fetch the report data.
        assistantReponses.push({ content: `Your ${uploadedFiles.length > 1 ? "files have" : "file has"} been processed.` });
        assistantReponses.push({
            sources: [{ title: TITLE_COMPLIANCE_REPORT_LINK, link: `/${reportId}`, type: OPEN_INTERNAL }],
        });
        console.log("Your files have been processed.");

        // Create assistant messages.
        const assistantMsgs = assistantReponses.map(({ content, sources }) => {
            return this.messageFactory.createMessage({ 
                content, 
                sources, 
                userId: this.userId, 
                role: ASSISTANT, 
                createdAt: getServerTimestamp() 
            });
        });

        // Save assistant messages.
        const savedAssistantMsgs = assistantMsgs.map(msg => this.messageService.save(msg));
        return Promise.all(savedAssistantMsgs);
    }
}

export default MessageResponderService;