import React from "react";
import firebase from "firebase/compat/app";
import Button from "@mui/material/Button";
import { googleAuthProvider } from "../../../firebase/firebaseUtil";

/**
 * GoogleSignInButton.
 * @param {object} props
 * @param {firebase.auth.Auth} props.auth
 * @param {Function} props.onError
 * @returns JSX Component
 */
function GoogleSignInButton({ auth, onError }) {

    function handleSignInWithGoogle() {
        const provider = googleAuthProvider();

        auth.signInWithPopup(provider)
            .catch((error) => {
                console.log(error.code, error.message);
                onError(error.message);
            });
    }

    return (
        <Button type="button" onClick={handleSignInWithGoogle} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} >
            Continue with Google
        </Button>
    )
}

export default GoogleSignInButton;