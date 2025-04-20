import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppLogoIcon from '../../logo/AppLogo';
import ToggleCollapseSidebar from './ToggleCollapseSidebar';
import { ThemeContext } from '../../context-provider/ThemeContext';
import { SidebarContext } from '../../context-provider/SidebarContext';

function SidebarHeader() {
    const { mode } = useContext(ThemeContext);
    const { collapsed, toggleCollapse } = useContext(SidebarContext);

    return (
        <Box
            className='Sidebar-header'
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                pl: 1,
                height: '25px',
            }}
        >
            <Stack sx={{ alignItems: 'left', flexGrow: 1 }}>
                <AppLogoIcon mode={mode} />
            </Stack>
            <Stack
                sx={{
                    display: { xs: 'none', lg: collapsed === false ? 'flex' : 'none' }
                }}
            >
                <ToggleCollapseSidebar onClickHandler={toggleCollapse} />
            </Stack>
        </Box>
    );
}

export default SidebarHeader;