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
     * @param {number} limit
     * @returns Query
     */
    getAll(limit) {
        return this.repository.getAll(limit);
    }

    /**
     * getAllWithinRange method.
     * @param {*} startAfter
     * @param {number} limit
     * @returns Query
     */
    getAllWithinRange(startAfter, limit) {
        return this.repository.getAllWithinRange(startAfter, limit);
    }
}

export default BaseService;