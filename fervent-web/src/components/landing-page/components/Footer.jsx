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
  const { mode } = useContext(ThemeContext);

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
          gap: { xs: 4, sm: 8 },
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box flex={1}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "left" },
              }}
            >
              <AppLogoHorizontal mode="dark" />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Product
            </Typography>
            <Link color="#FFF" href="#">
              Features
            </Link>
            <Link color="#FFF" href="#">
              Highlights
            </Link>
            <Link color="#FFF" href="#">
              Pricing
            </Link>
            <Link color="#FFF" href="#">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Company
            </Typography>
            <Link color="#FFF" href="/about">
              About us
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Legal
            </Typography>
            <Link color="#FFF" href="/terms-and-conditions">
              Terms
            </Link>
            <Link color="#FFF" href="/privacy-policy">
              Privacy
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box>
            <Link color="#FFF" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="#FFF" href="/terms-and-conditions">
              Terms of Service
            </Link>
            <Copyright sx={{ color: "#FFF", }} />
          </Box>
          <Stack
            direction="row"
            justifyContent="left"
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