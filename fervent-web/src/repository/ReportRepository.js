import BaseRepository from "./BaseRepository";

class ReportRepository extends BaseRepository {

    /**
     * Report Repository.
     * @param {firebase.app.App} app 
     * @param {object} user User.
     * @param {string} user.uid Unique Id.
     */
    constructor(app, user) {
        const reportsCollectionPath = `users/${user.uid}/reports`;
        super(app, reportsCollectionPath);
    }
}

export default ReportRepository;