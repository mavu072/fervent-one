import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material';
import { orgSupportEmail } from '../../../../config/appConfig';

function Contact() {
  return (
    <Box
      id="contact"
      sx={(theme) => ({
        width: '100%',
        bgcolor: theme.palette.mode === 'light' ? '#FFF' : `${alpha('#090E10', 0.0)}`,
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'left' },
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
        }}
      >
        <Stack useFlexGap sx={{ width: '100%' }}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              We love hearing from our users!
            </Typography>
          </div>
          <Typography
            component="div"
            variant="body2"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: '100%', mb: 2.5 }}
          >
            If you have any questions, feedback, or suggestions, please don’t hesitate to reach out to us.
          </Typography>
          <Box>
            <Button variant="contained" size="medium" color="primary" href={"mailto:" + orgSupportEmail}>
              Contact us
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Contact;