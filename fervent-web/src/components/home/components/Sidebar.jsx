import React, { useContext } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
import { grey } from '@mui/material/colors';
import { closeSidebar } from '../util/sidebarUtil';
import { ThemeContext } from '../../context-provider/ThemeContext';
import PaneNavigation from './PaneNavigation';
import AppLogoIcon from '../../logo/AppLogo';

/**
 * Sidebar.
 * @returns JSX Component
 */
function Sidebar() {
  const { mode } = useContext(ThemeContext);

  return (
    <Paper
      className="Sidebar"
      sx={(theme) => ({
        position: { xs: 'fixed', lg: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          lg: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 9998,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 0,
        backgroundColor: theme.palette.mode === 'light' ? grey[100] : grey[900],
      })}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '280px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '280px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9997,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--material-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Stack sx={{ alignItems: 'left', flexGrow: 1 }}>
          <AppLogoIcon mode={mode} />
        </Stack>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <PaneNavigation onClick={closeSidebar} />
      </Box>
    </Paper >
  );
}

export default Sidebar;