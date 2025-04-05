import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import Copyright from './Copyright';
import { gitRepo } from '../../../config/appConfig';
import { ThemeContext } from '../../context-provider/ThemeContext';
import { AppLogoHorizontal } from '../../logo/AppLogo';

function Footer() {

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 4 },
          py: { xs: 5, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            gap: { xs: 4, sm: '' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box flex={1}
              sx={{
                display: "flex",
                justifyContent:  { xs: 'center', sm: "left" },
              }}
            >
              <AppLogoHorizontal mode="dark" />
            </Box>
          </Box>

          <Box flex={1}
            sx={{
              display: "flex",
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Product
              </Typography>
              <Link color="#FFF" href="/?goto=features">
                Features
              </Link>
              <Link color="#FFF" href="/?goto=highlights">
                Highlights
              </Link>
              <Link color="#FFF" href="/?goto=pricing">
                Pricing
              </Link>
              <Link color="#FFF" href="/?goto=faq">
                FAQs
              </Link>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Company
              </Typography>
              <Link color="#FFF" href="/about">
                About
              </Link>
              <Link color="#FFF" href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link color="#FFF" href="/terms-and-conditions">
                Terms & Conditions
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            pt: { xs: 1, sm: 2 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Copyright sx={{ color: "#FFF", textAlign: { xs: 'center', sm: 'left' }, }} />
          <Stack
            direction="row"
            justifyContent={{ xs: 'center', sm: 'left' }}
            spacing={1}
            useFlexGap
          >
            <IconButton
              color="inherit"
              href={gitRepo}
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <GitHubIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;