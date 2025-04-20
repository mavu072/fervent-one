
/**
 * Retrieves theme preference from the local storage, return 'light' if not found.
 * @returns Theme mode
 */
export const getThemePreference = () => {
    const storedPreference = localStorage.getItem('mode');
    return storedPreference ? storedPreference : 'light';
}

/**
 * Saves theme preference in the local storage.
 * @param {string} mode Theme mode i.e. 'light' or 'dark'.
 */
export const saveThemePreference = (mode) => {
    localStorage.setItem('mode', mode);
}