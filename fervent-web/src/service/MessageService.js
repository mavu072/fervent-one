import MessageRepository from "../repository/MessageRepository";
import BaseService from "./BaseService";

class MessageService extends BaseService {

    /**
     * Message Service.
     * @param {MessageRepository} messageRepository 
     */
    constructor(messageRepository) {
        super(messageRepository);
    }

    async getChatHistory() {
        const msgs = await this.getAll().get();
        const chatHistory = msgs?.docs.map(msg => {
            const { content, role } = msg.data();
            return { content, role: role === "user" ? "human" : "ai", };
        }).filter(msg => msg.content);
        return chatHistory;
    }
}

export default MessageService;