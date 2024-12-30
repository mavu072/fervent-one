import React, { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import PasswordResetLink from './PasswordResetLink';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

/**
 * SignInForm
 * @param {object} props
 * @param {Function} props.onMessage
 * @returns JSX Component
 */
function SignInForm({ onMessage }) {
    const [email, setEmail] = useState(null);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [accountAction, setAccountAction] = useState("Don't have an account? Sign Up");

    const authFormRef = useRef();

    function toggleAccountAction() {
        setIsSigningUp((prev) => (prev === false ? true : false));
        setAccountAction(isSigningUp ? "Don't have an account? Sign Up" : "Already have an account? Sign In");
    }

    return (
        <Box component="form" ref={authFormRef} noValidate sx={{ mt: 1 }}>
            <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            {isSigningUp &&
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                />
            }

            {!isSigningUp && <SignInButton formRef={authFormRef} onMessage={onMessage} />}
            {isSigningUp && <SignUpButton formRef={authFormRef} onMessage={onMessage} />}

            <Grid container
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Grid>
                    <PasswordResetLink emailAddress={email} onMessage={onMessage} />
                </Grid>
                <Grid>
                    <Link href="#" variant="body2" onClick={toggleAccountAction}>{accountAction}</Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SignInForm;