import BaseRepository from "./BaseRepository";

class ReportRepository extends BaseRepository {

    /**
     * Report Repository.
     * @param {firebase.app.App} app 
     * @param {string} reportsCollectionPath 
     */
    constructor(app, reportsCollectionPath) {
        super(app, reportsCollectionPath);
    }
}

export default ReportRepository;