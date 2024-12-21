function MessageFactory() {
    /**
     * Create message.
     * @param {object} param0 Message object. Allows a de-constructed object as parameters.
     * @returns Message object
     */
    this.createMessage = function ({ content, attachment = null, sources = null, role, userId, createdAt }) {

        // Format assistant sources
        let formattedSources = null;
        if (role === 'assistant' && sources) {
            const assistantSources = new Map();
            sources.forEach((item, index) => {
                assistantSources.set(`source ${index + 1}`, item[0]);
            });
            formattedSources = Object.fromEntries(assistantSources)
        }

        return {
            content: content,
            attachment: attachment,
            sources: sources ? formattedSources : sources,
            role: role,
            userId: userId,
            createdAt: createdAt,
        }
    }
}

export default MessageFactory;