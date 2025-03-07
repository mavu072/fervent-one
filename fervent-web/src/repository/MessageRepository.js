import firebase from "firebase/compat/app";
import BaseRepository from "./BaseRepository";

class MessageRepository extends BaseRepository {

    /**
     * Message Repository.
     * @param {firebase.app.App} app 
     * @param {string} messagesCollectionPath 
     */
    constructor(app, messagesCollectionPath) {
        super(app, messagesCollectionPath);
    }
}

export default MessageRepository;