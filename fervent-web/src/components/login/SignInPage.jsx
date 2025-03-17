import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SnackBarNotification from '../notification/SnackBar';
import Copyright from '../landing-page/components/Copyright';
import GoogleSignInButton from './components/GoogleSignInButton';
import PageTitle from './components/PageTitle';
import SignInForm from './components/SignInForm';
import { AppContext } from '../context-provider/AppContext';
import { appName } from '../../config/appConfig';

/**
 * SignInPage.
 * @returns JSX Component.
 */
function SignInPage() {
    const { user, infoMsg, onInfoMessage } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            onInfoMessage("Logged in. Redirecting to home...");
            setTimeout(() => {
                navigate('/home');
            }, 3000);
        }
    }, [user, navigate, onInfoMessage]);

    return (
        <React.Fragment>
            <title>
                Login | {appName}
            </title>
            <Container component="main" maxWidth="xs">
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
                    <GoogleSignInButton onError={onInfoMessage} />
                    <Typography>or</Typography>
                    <SignInForm onMessage={onInfoMessage} />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default SignInPage;