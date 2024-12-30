
/**
 * Get File Type.
 * @param {string} mimeType The file mime type.
 * @returns {string} The file type i.e. pdf, png, etc.
 */
export function getFileType(mimeType) {
    const match = mimeType.match(/jpg|jpeg|png|pdf/g);
    if (match) {
        return match[0];
    }
    return null;
}

/**
* Converts a file size in bytes to a human-readable format (KB, MB, GB).
* @param {number} fileSize The size of the file in bytes.
* @returns {string} The formatted file size in KB, MB, or GB.
*/
export function formatFileSize(fileSize) {
    if (typeof fileSize !== 'number' || fileSize < 0) {
        throw new Error('Invalid file size. Please provide a non-negative number.');
    }

    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;

    if (fileSize < KB) {
        return `${fileSize} bytes`;
    } else if (fileSize < MB) {
        return `${(fileSize / KB).toFixed(2)} KB`;
    } else if (fileSize < GB) {
        return `${(fileSize / MB).toFixed(2)} MB`;
    } else {
        return `${(fileSize / GB).toFixed(2)} GB`;
    }
}