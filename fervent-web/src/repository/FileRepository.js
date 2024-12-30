import firebase from "firebase/compat/app";
import BaseRepository from "./BaseRepository";

class FileRepository extends BaseRepository {

    /**
     * File Repository.
     * @param {firebase.app.App} app 
     * @param {string} messagesCollectionPath 
     */
    constructor(app, filesCollectionPath) {
        super(app, filesCollectionPath)
    }
}

export default FileRepository;