import React, { useContext } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import SidebarList from './SidebarList';
import AppLogoIcon from '../../logo/AppLogo';
import { ThemeContext } from '../../context-provider/ThemeContext';
import { SidebarContext } from '../../context-provider/SidebarContext';
import { closeSidebar, collapsedWidth, largeScreenWidth, standardScreenWidth } from '../util/sidebarUtil';
import ToggleCollapseSidebar from './ToggleCollapseSidebar';

function SidebarHeader() {
  const { mode } = useContext(ThemeContext);
  const { collapsed } = useContext(SidebarContext);

  return (
    <Box
      className='Sidebar-header'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        // pl: 1,
        px: 1,
        height: '25px',
      }}
    >
      <Stack sx={{ alignItems: 'left', flexGrow: 1, px: 2 }}>
        <AppLogoIcon mode={mode} />
      </Stack>
      <Stack
        sx={{
          display: { xs: 'none', lg: collapsed === false ? 'flex' : 'none' },
        }}
      >
        <ToggleCollapseSidebar />
      </Stack>
    </Box>
  );
}

/**
 * Sidebar.
 * @returns JSX Component
 */
function Sidebar() {
  const { collapsed } = useContext(SidebarContext);
  return (
    <Paper
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', lg: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          lg: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 'tooltip',
        height: '100dvh',
        width: { xs: 'var(--Sidebar-width-xs)', lg: 'var(--Sidebar-width)' },
        top: 0,
        pt: 2,
        px: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 0,
        backgroundColor: 'background.paper',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width-xs': standardScreenWidth,
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': collapsed === true ? collapsedWidth : largeScreenWidth,
            },
            '--Sidebar-background-backdrop': 'rgba(0, 0, 0, 0.5)',
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: '9997',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--Sidebar-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width-xs, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <SidebarHeader />
      <SidebarList />
    </Paper >
  );
}

export default Sidebar;