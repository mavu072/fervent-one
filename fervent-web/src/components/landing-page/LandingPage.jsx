import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { AppContext } from '../context-provider/AppContext';

function LandingPage() {
  const { user, mode } = useContext(AppContext);
  const navigate = useNavigate();

  const defaultTheme = createTheme({ palette: { mode } });

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;