/**
 * Utility functions
 */

/**
 * Accepts a Date object and returns the time as Hh:mm.
 * @param {Date} date 
 * @returns {String} Time in formart Hh:mm
 */
function formatTime(date) {
    if (date !== null && date !== undefined && date !== '') {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday = date.getDate() === today.getDate();
        const isYesterday = date.getDate() === yesterday.getDate();

        const hours = date.getHours().toString().padStart(2, '0'); // Ensure leading zero if needed
        const minutes = date.getMinutes().toString().padStart(2, '0');

        if (isToday) {
            return `${hours}:${minutes}`;
        } else if (isYesterday) {
            return `Yesterday ${hours}:${minutes}`;
        } else {
            const dt = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${dt}/${month}/${year} ${hours}:${minutes}`;
        }
    }
    return `--:--`;
}

export { formatTime, }