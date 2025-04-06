import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import Copyright from './Copyright';
import { gitRepo } from '../../../../config/appConfig';
import { AppLogoHorizontal } from '../../../logo/AppLogo';

function Footer() {
  return (
    <Box
      sx={{
        color: 'grey.400',
        bgcolor: '#06090a',
        textDecoration: 'no-underline',
        '& a:hover': {
          color: 'grey.100'
        }
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
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: { xs: '100%', sm: '60%' }, }} >
            <Box sx={{ display: "flex", flex: 1, justifyContent: { xs: 'center', sm: "left" }, }} >
              <AppLogoHorizontal mode="dark" />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                color: 'inherit',
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                Product
              </Typography>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/?goto=features">
                Features
              </Link>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/?goto=highlights">
                Highlights
              </Link>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/?goto=pricing">
                Pricing
              </Link>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/?goto=faq">
                FAQs
              </Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, }}  >
              <Typography variant="body1" fontWeight={600}>
                Company
              </Typography>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/about">
                About Us
              </Link>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link variant='body2' color="inherit" sx={{ textDecoration: "inherit" }} href="/terms-and-conditions">
                Terms and Conditions
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
          <Copyright sx={{ color: "inherit", textAlign: { xs: 'center', sm: 'left' }, }} />
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