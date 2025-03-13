import firebase from "firebase/compat/app";
import BaseRepository from "./BaseRepository";

class MessageRepository extends BaseRepository {

    /**
     * Message Repository.
     * @param {firebase.app.App} app App.
     * @param {object} user User.
     * @param {string} user.uid Unique Id.
     */
    constructor(app, user) {
        const messagesCollectionPath = `users/${user.uid}/messages`;
        super(app, messagesCollectionPath);
    }
}

export default MessageRepository;