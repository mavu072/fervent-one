import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { googleAuthProvider } from "../../../firebase/firebaseUtil";
import { AppContext } from "../../context-provider/AppContext";

/**
 * GoogleSignInButton.
 * @param {object} props
 * @param {Function} props.onError
 * @returns JSX Component
 */
function GoogleSignInButton({ onError }) {
    const { auth } = useContext(AppContext);

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