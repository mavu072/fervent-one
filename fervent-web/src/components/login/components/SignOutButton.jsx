import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { AppContext } from "../../context-provider/AppContext";

/**
 * SignOutButton.
 * @param {object} props  
 * @param {string} props.label (Optional) Button label.
 * @param {Function} props.onClick (Optional) Additional onclick event handler.
 * @returns JSX Component
 */
function SignOutButton({ label = undefined, onClick = undefined }) {
    const { auth } = useContext(AppContext);

    const navigate = useNavigate();

    function handleClick(e) {
        if (onClick) onClick(e);
        signOutUser();
    }

    function signOutUser() {
        auth.signOut()
            .then(() => {
                console.log("User logged out.");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    }

    return (
        <Button
            type="button"
            fullWidth
            variant="text"
            color="neutral"
            size="small"
            aria-label="button to sign out"
            onClick={handleClick}
            sx={{
                textTransform: "capitalize",
            }}
            startIcon={<LogoutRoundedIcon />}
        >
            {label && <Typography>{label}</Typography>}
        </Button>
    );
}

export default SignOutButton;