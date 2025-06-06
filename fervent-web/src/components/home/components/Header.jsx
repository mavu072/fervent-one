import React, { useContext } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { toggleSidebar } from '../util/sidebarUtil';
import { appName, MESSAGES_TITLE } from '../../../config/appConfig';
import MenuButton from '../../buttons/MenuButton';
import AccountContextMenu from '../../account/AccountContextMenu';
import ToggleColorMode from '../../theme/ToggleColorMode';
import ToggleCollapseSidebar from './ToggleCollapseSidebar';
import { SidebarContext } from '../../context-provider/SidebarContext';

/**
 * Header.
 * @returns JSX Component
 */
function Header() {
  const { selectedTab, collapsed, toggleCollapse } = useContext(SidebarContext);

  return (
    <Paper
      sx={{
        display: { xs: 'flex', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        right: 0,
        height: 'var(--Header-height)',
        width: { xs: '100%', lg: 'calc(100dvw - var(--Sidebar-width))' },
        zIndex: 9995,
        p: 2,
        pr: 1.5, // Shifting to create room for context menu.
        gap: .25, // Gap between children
        boxShadow: 'none',
        border: 'none',
        borderRadius: 0,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('lg')]: {
              '--Header-height': '52px',
            },
          },
        })}
      />
      <Stack sx={{ display: { xs: 'flex', lg: 'none' }, m: 0, p: 0, }}>
        <MenuButton onClickHandler={toggleSidebar} />
      </Stack>
      <Stack
        sx={{
          display: { xs: 'none', lg: collapsed === true ? 'flex' : 'none' },
          m: 0,
          p: 0,
        }}
      >
        <ToggleCollapseSidebar onClickHandler={toggleCollapse} />
      </Stack>
      <Typography fontWeight="lg" fontSize="lg" component="h2" noWrap flex={1} pl={1}>
        {selectedTab.title === "" || selectedTab.title === MESSAGES_TITLE ? appName : selectedTab.title}
      </Typography>
      <ToggleColorMode />
      <AccountContextMenu />
    </Paper>
  );
}

export default Header;