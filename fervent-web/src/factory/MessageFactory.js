function MessageFactory() {
    
    /**
     * Create message.
     * @param {object} message Message object. Allows a de-constructed object as parameters.
     * @param {string} message.content (Optional) Content @description A message can be text content or an attachment.
     * @param {object} message.attachment (Optional) Attachment 
     * @param {string} message.attachment.name Attachment Name
     * @param {number} message.attachment.size Attachment Size
     * @param {number} message.attachment.type Attachment Type
     * @param {object} message.sources Message Sources
     * @param {"user" | "assistant"} message.role Message Sender's Role
     * @param {string} message.userId Recipient User Id
     * @param {firebase.firestore.FieldValue} message.createdAt Created At timestamp
     * @returns Message object
     */
    this.createMessage = function ({ content = null, attachment = null, sources = null, role, userId, createdAt }) {
        return {
            content: content,
            attachment: attachment,
            sources: sources,
            role: role,
            userId: userId,
            createdAt: createdAt,
        }
    }
}

export default MessageFactory;