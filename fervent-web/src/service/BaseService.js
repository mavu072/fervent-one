import BaseRepository from "../repository/BaseRepository";

class BaseService {

    /**
     * Base Service.
     * @param {BaseRepository} repository 
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Save method.
     * @param {object} documentData
     * @returns Promise
     */
    save(documentData) {
        return this.repository.save(documentData);
    }
    
    /**
     * Update method.
     * @param {string} documentPath 
     * @param {object} updateData 
     * @param {object} options 
     * @param {boolean} options.merge 
     * @returns Promise
     */
    update(documentPath, updateData, { merge = false }) {
        return this.repository.update(documentPath, updateData, { merge: merge })
    }

    /**
     * Get method.
     * @param {string} documentPath 
     * @returns Document
     */
    get(documentPath) {
        return this.repository.get(documentPath);
    }

    /**
     * GetAll method.
     * @param {number} limit The maximum number of the number of documents returned.
     * @param {string} [sort="asc"] The sort direction. Accepts 'asc' or 'desc'.
     * @returns Query
     */
    getAll(limit = null, sort = "asc") {
        return this.repository.getAll(limit, sort);
    }

    /**
     * getAllWithinRange method.
     * @param {*} startAfter The start after document.
     * @param {number} limit The maximum number of the number of documents returned.
     * @param {string} [sort="asc"] The sort direction. Accepts 'asc' or 'desc'.
     * @returns Query
     */
    getAllWithinRange(startAfter, limit, sort = "asc") {
        return this.repository.getAllWithinRange(startAfter, limit, sort);
    }

    /**
     * deleteAll method.
     * @returns Delete Result
     */
    deleteAll() {
        return this.repository.deleteAll();
    }
}

export default BaseService;