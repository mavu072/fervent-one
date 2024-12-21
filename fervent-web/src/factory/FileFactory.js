function FileFactory() {
    /**
     * Create file.
     * @param {object} param0 File object. Allows a de-constructed object as parameters.
     * @returns File object
     */
    this.createFile = function ({ name, size, type, content, report }) {
        return {
            name: name,
            size: size,
            type: type,
            content: content,
            report: report,
        }
    }
}

export default FileFactory;