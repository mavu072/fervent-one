import React from "react";
import firebase from "firebase/compat/app";
import Button from "@mui/material/Button";
import { getUserFriendlyErrorMessage } from "../../../firebase/firebaseErrorUtil";

/**
 * SignUpButton.
 * @param {object} props 
 * @param {firebase.auth.Auth} props.auth 
 * @param {React.MutableRefObject} props.formRef
 * @param {Function} props.onMessage
 * @returns JSX Component
 */
function SignUpButton({ auth, formRef, onMessage }) {

    function handleSignUp() {
        const data = new FormData(formRef.current);
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("confirm-password");

        if (password !== confirmPassword) {
            onMessage("Passwords do not match.");
        } else {
            onMessage("Creating and signing in new user...");
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCred) => {
                    console.log("User created and authenticated", userCred.user.displayName);
                })
                .catch((error) => {
                    console.log(error.code, error.message);
                    const friendlyMsg = getUserFriendlyErrorMessage(error?.code, error?.message);
                    onMessage(friendlyMsg ? friendlyMsg : error.message);
                });
        }
    };

    return (
        <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
        >
            Sign Up
        </Button>
    )
}

export default SignUpButton;