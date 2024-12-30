import ReportRepository from "../repository/ReportRepository";
import BaseService from "./BaseService";

class ReportService extends BaseService {

    /**
     * Report Service.
     * @param {ReportRepository} reportRepository 
     */
    constructor(reportRepository) {
        super(reportRepository);
    }
}

export default ReportService;