import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context-provider/Context';
import { appName } from '../../util/appNameUtil';
import { googleAuthProvider } from '../../firebase/firebaseUtil';
import { Copyright } from '../landing-page/components/Footer';

function SignIn() {
    const { auth, user, mode } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/home');
    }, [auth, user, navigate]);

    const defaultTheme = createTheme({ palette: { mode } });

    const [buttonText, setButtonText] = useState("Sign In");
    const [accountAction, setAccountAction] = useState("Don't have an account? Sign Up");
    const [email, setEmail] = useState(null);

    const toggleAccountAction = () => {
        setButtonText((prev) => (prev === "Sign Up" ? "Sign In" : "Sign Up"));
        setAccountAction((prev) =>
            (prev === "Already have an account? Sign In" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"));
    }

    const handleSignInWithEmailAndPassword = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        if (buttonText === "Sign In") {
            auth.signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    console.log(error.code, error.message);
                })
                .finally(() => {
                    console.log('User authenticated.');
                });
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .catch((error) => {
                    console.log(error.code, error.message);
                })
                .finally(() => {
                    console.log('User created.');
                });
        }
    };

    const handleSignInWithGoogle = () => {
        const provider = googleAuthProvider();
        auth.signInWithPopup(provider)
            .catch((error) => {
                console.log(error.code, error.message);
            })
            .finally(() => {
                console.log('User successfully logged in.');
            });
    }

    const handlePasswordResetRequest = () => {
        if (!email) console.log('Invalid email.');
        else {
            auth.sendPasswordResetEmail(email)
                .catch((error) => {
                    console.log(error.code, error.message);
                })
                .finally(() => {
                    console.log('Password reset email sent.');
                });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h3"
                        sx={{ mt: 2, textAlign: { xs: 'center', sm: 'left' } }}
                    >
                        Sign in to {appName}
                    </Typography>
                    <Button type="button" onClick={handleSignInWithGoogle} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} >
                        Continue with Google
                    </Button>
                    <Typography>
                        or
                    </Typography>
                    <Box component="form" onSubmit={handleSignInWithEmailAndPassword} noValidate sx={{ mt: 1 }}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {buttonText}
                        </Button>
                        <Grid container sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={handlePasswordResetRequest}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={toggleAccountAction}>
                                    {accountAction}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;