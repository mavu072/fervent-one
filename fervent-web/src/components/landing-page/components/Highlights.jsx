import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import AccessibilityNew from '@mui/icons-material/AccessibilityNew';
import SecurityRounded from '@mui/icons-material/SecurityRounded';
import DocumentScannerRounded from '@mui/icons-material/DocumentScannerRounded';
import SupportAgentRounded from '@mui/icons-material/SupportAgentRounded';
import { appName } from '../../../util/appNameUtil';

const items = [
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovation',
    description:
      'Cutting-edge AI technology delivers accurate and relevant legal information.',
  },
  {
    icon: <AccessibilityNew />,
    title: 'Accessibility',
    description:
      'Free to use, ensuring all South African employees have access to legal knowledge.',
  },
  {
    icon: <DocumentScannerRounded />,
    title: 'Compliance Checker',
    description:
      'Ensure your employment agreements comply with South African laws with our AI-driven compliance checker.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Empowerment',
    description:
      'Tools to make informed decisions and protect your workplace rights.',
  },
  {
    icon: <SecurityRounded />,
    title: 'Security',
    description:
      'Privacy is a priority. We comply with PoPIA and protect your data',
  },

  {
    icon: <SupportAgentRounded />,
    title: 'Support',
    description:
      'Dedicated support team available to assist with your queries and provide guidance.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Why Choose {appName}?
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Discover the Benefits of {appName}.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}