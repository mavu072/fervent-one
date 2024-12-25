import React from "react";
import firebase from "firebase/compat/app";
import Button from "@mui/material/Button";
import { getUserFriendlyErrorMessage } from "../../../firebase/firebaseErrorUtil";

/**
 * SignInButton.
 * @param {object} props 
 * @param {firebase.auth.Auth} props.auth 
 * @param {React.MutableRefObject} props.formRef
 * @param {Function} props.onMessage
 * @returns JSX Component
 */
function SignInButton({ auth, formRef, onMessage }) {

    function handleSignIn() {
        const data = new FormData(formRef.current);
        const email = data.get('email');
        const password = data.get('password');

        onMessage("Signing in...");
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("User signed in.");
            })
            .catch((error) => {
                console.log(error.code, error.message);
                const friendlyMsg = getUserFriendlyErrorMessage(error?.code);
                onMessage(friendlyMsg ? friendlyMsg : error.message);
            });
    };

    return (
        <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
        >
            Sign In
        </Button>
    )
}

export default SignInButton;