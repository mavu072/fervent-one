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
}

export default MessageService;