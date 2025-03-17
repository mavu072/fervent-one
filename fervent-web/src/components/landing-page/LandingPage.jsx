import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { AppContext } from '../context-provider/AppContext';
import { appDescription, appName, metaDescription, metaKeywords } from '../../config/appConfig';

/**
 * LandingPage.
 * @returns JSX Component
 */
function LandingPage() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      <>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <title>
          {appName}: {appDescription}
        </title>
      </>
      <AppAppBar />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
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
    </React.Fragment>
  );
}

export default LandingPage;