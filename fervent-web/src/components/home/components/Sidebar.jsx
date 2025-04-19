import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { closeSidebar, largeScreenWidth, standardScreenWidth } from '../util/sidebarUtil';
import SidebarHeader from './SidebarHeader';
import SidebarList from './SidebarList';

/**
 * Sidebar.
 * @returns JSX Component
 */
function Sidebar() {
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
        zIndex: 9998,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        pt: 2,
        px: 2,
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
            '--Sidebar-width': standardScreenWidth,
            [theme.breakpoints.up('md')]: {
              '--Sidebar-width': largeScreenWidth,
            },
            '--Sidebar-background-backdrop': 'rgba(0, 0, 0, 0.5)',
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
          backgroundColor: 'var(--Sidebar-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <SidebarHeader />
      <SidebarList onClick={closeSidebar} />
    </Paper >
  );
}

export default Sidebar;