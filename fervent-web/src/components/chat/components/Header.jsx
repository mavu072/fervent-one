import { useContext } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { toggleSidebar } from '../util/sidebarUtil';
import { appName, } from '../../../util/appNameUtil';
import { AppContext } from '../../context-provider/Context';
import MenuButton from './MenuButton';
import AccountContextMenu from './AccountContextMenu';
import ToggleColorMode from '../../theme/ToggleColorMode';

function Header() {
  const { auth, user, mode, toggleColorMode } = useContext(AppContext);

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
        width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
        zIndex: 9995,
        p: 2,
        pr: 1.5, // Shifting to create room for context menu.
        gap: .25, // Gap between children
        boxShadow: 'none',
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
      <MenuButton onClickHandler={toggleSidebar} />
      <Typography fontWeight="lg" fontSize="lg" component="h2" noWrap flex={1}>{appName}</Typography>
      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
      {user && <AccountContextMenu user={user} auth={auth} />}
    </Paper>
  );
}

export default Header;