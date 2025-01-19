/** @type {import('jest').Config} */

export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/jestSetup.js"],
};