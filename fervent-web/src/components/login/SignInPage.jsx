import React, { useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SnackBarNotification from '../notification/SnackBar';
import Copyright from '../landing-page/components/Copyright';
import GoogleSignInButton from './components/GoogleSignInButton';
import PageTitle from './components/PageTitle';
import { AppContext } from '../context-provider/AppContext';
import SignInForm from './components/SignInForm';

function SignInPage() {
    const { authError, user, mode } = useContext(AppContext);
    
    const defaultTheme = createTheme({ palette: { mode } });
    const navigate = useNavigate();

    const [infoMsg, setInfoMsg] = useState({ message: null, count: 0 }); // Generic state for handling all messages.

    useEffect(() => {
        if (user) {
            onMessage("Logged in. Redirecting to home...");
            setTimeout(() => {
                navigate('/home');
            }, 3000);
        }
    }, [user, navigate]);

    useEffect(() => {
        if (authError) console.log("Monitoring Auth Error:", authError);
    }, [authError]);

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
                    <GoogleSignInButton onError={onMessage} />
                    <Typography>or</Typography>
                    <SignInForm onMessage={onMessage} />
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignInPage;