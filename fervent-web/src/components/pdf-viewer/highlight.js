/**
 * Highlights a string within text.
 * @param {string} text The complete text.
 * @param {string | RegExp} pattern Text or pattern to highlight.
 * @returns 
 */
export function highlightPattern(text, pattern) {
    // Break text and search for words to account for text layout changes. e.g. missing newline and space characters.
    const parts = pattern.split(" ");

    // Count matches.
    let wordMatches = 0;
    parts.forEach((part) => {
        if (text.includes(part)) {
            wordMatches++;
        }
    });

    // Highlight text that contains up to 60% of the words.
    if (wordMatches > Math.floor((60 / 100) * parts.length)) {
        parts.forEach((part) => {
            text = text.replace(part, (value) => `<mark>${value}</mark>`);
        });
    }

    return text;
}