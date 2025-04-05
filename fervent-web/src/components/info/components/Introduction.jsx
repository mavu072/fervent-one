import React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { orgName } from '../../../config/appConfig';

function Introduction() {
  return (
    <Box
      id="intro"
      sx={(theme) => ({
        width: '100%',
        bgcolor: theme.palette.mode === 'light' ? '#FFF' : `${alpha('#090E10', 0.0)}`,
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h7"
            color="text.primary"
            width='100%'
            textAlign='center'
          >
            <strong>About Us</strong> | {orgName}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(1rem, 10vw, 2.2rem)',
              fontWeight: 600,
            }}
          >
            We're on a mission to make&nbsp;
            <Typography
              component="span"
              variant="h4"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                fontSize: 'clamp(1rem, 10vw, 2.2rem)',
                fontWeight: 600,
              }}
            >
              workplace rights and laws accessible and understandable to all South Africans.
            </Typography>
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
              We are dedicated to empowering South African employees and labourers with the knowledge and tools they need to understand and protect their legal rights in the workplace.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Introduction;