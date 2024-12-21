import firebase from "firebase/compat/app";

class MessageRepository {

    /**
     * Message repository constructor.
     * @param {firebase.app.App} app 
     * @param {*} userId 
     */
    constructor(app, userId) {
        this.app = app;
        this.firestore = this.app.firestore;
        this.messagesRef = this.firestore.collection(`users/${userId}/messages`);
    }

    /**
     * Save message.
     * @param {object} message Object containing the new message
     * @returns {Promise} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend.
     */
    saveMessage = function (message) {
       return this.messagesRef.add(message);
    }

    /**
     * Creates and returns a new Query that only returns the last matching documents
     * @param {*} limit Number of limit
     * @returns A firebase Query
     */
    getAll = function (limit) {
        const query = this.messagesRef
            .orderBy('createdAt', 'asc')
            .limitToLast(limit);
        return query;
    }

}

export default MessageRepository;