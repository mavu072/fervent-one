import React, { useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SnackBarNotification from '../notification/SnackBar';
import Copyright from '../landing-page/components/Copyright';
import PageLoader from '../loader/PageLoader';
import GoogleSignInButton from './components/GoogleSignInButton';
import PageTitle from './components/PageTitle';
import { AppContext } from '../context-provider/Context';
import SignInForm from './components/SignInForm';

function SignInPage() {
    const { auth, user, mode } = useContext(AppContext);

    const navigate = useNavigate();
    const defaultTheme = createTheme({ palette: { mode } });
    const [error, setError] = useState({ message: null, errorCount: 0 }); // Count to enable re-renders.
    const [infoMsg, setInfoMsg] = useState({ message: null, count: 0 }); // Generic state for generic messages.

    useEffect(() => {
        if (user) navigate('/home');
    }, [auth, user, navigate]);

    function onError(newError) {
        setError((prev) => {
            return {
                message: newError,
                errorCount: prev.errorCount + 1,
            }
        });
    }

    function onMessage(newMsg) {
        setInfoMsg((prev) => {
            return {
                message: newMsg,
                count: prev.count + 1,
            }
        });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {error.message && <SnackBarNotification key={error.errorCount} message={error.message} />}
                {infoMsg.message && <SnackBarNotification key={infoMsg.count} message={infoMsg.message} />}
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <PageTitle />
                    <GoogleSignInButton auth={auth} onError={onError} />
                    <Typography>or</Typography>
                    <SignInForm auth={auth} onError={onError} onMessage={onMessage} />
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignInPage;