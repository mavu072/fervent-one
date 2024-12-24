import React from "react";
import Button from '@mui/material/Button';

/**
 * GoToLoginButton.
 * @param {object} props
 * @param {string} props.title 
 * @returns JSX Component
 */
function GoToLoginButton({ title = "Sign In or Sign Up" }) {
    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            component="a"
            href="/login"
        >
            {title}
        </Button>
    );
}

export default GoToLoginButton;