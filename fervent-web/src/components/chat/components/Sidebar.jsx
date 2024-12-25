import React, { useContext } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
import { grey } from '@mui/material/colors';
import { closeSidebar } from '../util/sidebarUtil';
import { AppContext } from '../../context-provider/Context';
import PaneSelector from './PaneSelector';
import SignOutButton from '../../login/components/SignOutButton';
import LogoSmall from '../../logo/LogoSmall';

function Sidebar() {
  const { auth, user, mode } = useContext(AppContext);

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
            '--Sidebar-width': '240px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
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
          <LogoSmall mode={mode} />
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
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': '4px',
          }}
        >
          <PaneSelector />
        </List>
      </Box>

      {user && (
        <>
          <Divider />
          <SignOutButton label={"Log out"} auth={auth} />
        </>
      )}
    </Paper >
  );
}

export default Sidebar;