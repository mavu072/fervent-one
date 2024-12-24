
/**
 * Provides a user friendly error message for Firebase errors.
 * @param {string} errorCode Firebase error code
 * @param {string} errorMessage Firebase error message
 * @returns User Friendly Message
 * @description See `firebase.FirebaseError` class to understand error codes.
 */
export function getUserFriendlyErrorMessage(errorCode, errorMessage = "") {
    let error = null;

    switch (errorCode) {
        case "auth/invalid-email":
            error = "Invalid email address.";
            break;
        case "auth/missing-password":
            error = "Password is required.";
            break;
        case "auth/invalid-credential":
            error = "Incorrect email or password.";
            break;
        case "auth/weak-password":
        default:
            error = errorMessage.replace("Firebase:", "").replace(`(${errorCode}).`, "").trim() + ".";
            break;
    }

    return error;
}