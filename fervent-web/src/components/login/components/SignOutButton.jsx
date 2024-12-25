import React from "react";
import firebase from "firebase/compat/app";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';

/**
 * SignOutButton.
 * @param {object} props 
 * @param {firebase.auth.Auth} props.auth 
 * @returns JSX Component
 */
function SignOutButton({ auth }) {
    const navigate = useNavigate();

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
        <Tooltip title="Sign Out">
            <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ justifySelf: 'flex-end' }}
                onClick={signOutUser}
            >
                <LogoutRoundedIcon />
            </IconButton>
        </Tooltip>
    );
}

export default SignOutButton;