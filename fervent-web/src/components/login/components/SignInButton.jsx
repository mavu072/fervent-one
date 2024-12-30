import React, { useContext } from "react"
import Button from "@mui/material/Button";
import { getUserFriendlyErrorMessage } from "../../../firebase/firebaseErrorUtil";
import { AppContext } from "../../context-provider/AppContext";

/**
 * SignInButton.
 * @param {object} props 
 * @param {React.MutableRefObject} props.formRef
 * @param {Function} props.onMessage
 * @returns JSX Component
 */
function SignInButton({ formRef, onMessage }) {
    const { auth } = useContext(AppContext);

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