import FileRepository from "../repository/FileRepository";
import BaseService from "./BaseService";

class FileService extends BaseService {

    /**
     * File Service.
     * @param {FileRepository} fileRepository 
     */
    constructor(fileRepository) {
        super(fileRepository);
    }
}

export default FileService;