import { useContext } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { toggleSidebar } from '../util/sidebarUtil';
import { appName, } from '../../../util/appNameUtil';
import { AppContext } from '../../context-provider/Context';
import ToggleColorMode from '../../theme/ToggleColorMode';
import AccountAvatar from './AccountAvatar';

export default function Header() {
  const { user, mode, toggleColorMode } = useContext(AppContext);
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
        gap: 1,
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
      <IconButton onClick={() => toggleSidebar()} variant="outlined" color="neutral" size="sm"
        sx={{
          display: { xs: 'flex', lg: 'none' },
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
      <Typography fontWeight="lg" fontSize="lg" component="h2" noWrap flex={1}>
        {appName}
      </Typography>
      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} sx={{ ml: 'auto' }} />
      {user && <AccountAvatar user={user} />}
    </Paper>
  );
}