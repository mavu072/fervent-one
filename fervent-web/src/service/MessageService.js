import MessageRepository from "../repository/MessageRepository";

class MessageService {
    /**
     * 
     * @param {MessageRepository} messageRepository 
     */
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    saveMessage = function (message) {
        return this.messageRepository.saveMessage(message);
    }

    getAll = function (limit) {
        return this.messageRepository.getAll(limit);
    }
}

export default MessageService;