function FileFactory() {
    
    /**
     * Create file.
     * @param {object} file File object. Allows a de-constructed object as parameters.
     * @param {string} file.name File Name
     * @param {number} file.size File Size (Bytes)
     * @param {string} file.type File Type (Mime Type)
     * @param {string} file.content (Optional) File Content. Reserved for future use, storing file is an expensive task right now.
     * @param {firebase.firestore.FieldValue} message.createdAt Created At timestamp
     * @returns File object
     */
    this.createFile = function ({ name, size, type, content = null, createdAt }) {
        return {
            name: name,
            size: size,
            type: type,
            content: content,
            createdAt: createdAt,
        }
    };
}

export default FileFactory;