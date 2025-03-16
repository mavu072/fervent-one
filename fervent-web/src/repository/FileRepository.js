import firebase from "firebase/compat/app";
import BaseRepository from "./BaseRepository";

class FileRepository extends BaseRepository {

    /**
     * File Repository.
     * @param {firebase.app.App} app 
     * @param {object} user User.
     * @param {string} user.uid Unique Id.
     */
    constructor(app, user) {
        const filesCollectionPath = `users/${user.uid}/files`;
        super(app, filesCollectionPath);
    }
}

export default FileRepository;