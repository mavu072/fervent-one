import React, { useContext } from "react";
import Link from "@mui/material/Link";
import { getUserFriendlyErrorMessage } from "../../../firebase/firebaseErrorUtil";
import { AppContext } from "../../context-provider/AppContext";

/**
 * PasswordResetLink.
 * @param {object} props
 * @param {string} props.emailAddress
 * @param {Function} props.onMessage
 * @returns JSX Component
 */
function PasswordResetLink({ emailAddress, onMessage }) {
    const { auth } = useContext(AppContext);

    function handlePasswordResetRequest() {
        if (!emailAddress) {
            onMessage('Invalid email address.');
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
                    onMessage(friendlyMsg ? friendlyMsg : error.message);
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