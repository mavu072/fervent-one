
/**
 * Get File Type.
 * @param {string} mimeType 
 */
export function getFileType(mimeType) {
    const match = mimeType.match(/jpg|jpeg|png|pdf/g);
    if (match) {
        return match[0];
    }
    return null;
}