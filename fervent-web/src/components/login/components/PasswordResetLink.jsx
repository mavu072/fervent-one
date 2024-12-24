import React from "react";
import firebase from "firebase/compat/app";
import Link from "@mui/material/Link";
import { getUserFriendlyErrorMessage } from "../../../firebase/firebaseErrorUtil";

/**
 * PasswordResetLink.
 * @param {object} props
 * @param {firebase.auth.Auth} props.auth
 * @param {string} props.emailAddress
 * @param {Function} props.onError
 * @param {Function} props.onMessage
 * @returns JSX Component
 */
function PasswordResetLink({ auth, emailAddress, onError, onMessage }) {

    function handlePasswordResetRequest() {
        if (!emailAddress) {
            onError('Invalid email address.');
        } else {
            auth.sendPasswordResetEmail(emailAddress)
                .then(() => {
                    console.log("Password reset link sent.");
                    console.log("Microsoft is blocking these emails from reaching target mailbox.");
                    onMessage("Password reset link sent.");
                })
                .catch((error) => {
                    console.log(error.code, error.message);
                    const friendlyMsg = getUserFriendlyErrorMessage(error?.code);
                    onError(friendlyMsg ? friendlyMsg : error.message);
                });
        }
    }

    return (
        <Link href="#" variant="body2" onClick={handlePasswordResetRequest}>
            Forgot password?
        </Link>
    )
}

export default PasswordResetLink;