import React, { useContext } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { appName, SETTINGS_TITLE } from "../../config/appConfig";
import DeleteChatsButton from "./components/chats/DeleteChats";
import { ThemeContext } from "../context-provider/ThemeContext";

function Settings() {
    const { mode } = useContext(ThemeContext);

    const generalSettings = [
        {
            title: 'Theme',
            element: <Typography sx={{ textTransform: 'capitalize' }}>{mode}</Typography>,
        },
        {
            title: 'Language',
            element: <Typography>English</Typography>,
        },
        {
            title: 'Delete all messages',
            element: <DeleteChatsButton />,
            flexDirection: { xs: 'column', sm: 'row ' },
        },
    ];

    return (
        <Paper
            className="Settings-container"
            sx={{
                width: '100%',
                height: 'var(--Settings-height)',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                backgroundColor: 'background.body',
                borderRadius: 0,
            }}
        >
            <title>
                {SETTINGS_TITLE} – {appName}
            </title>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Settings-height': 'calc(100dvh - var(--Header-height))',
                    },
                }}
            />
            <Box
                className="Inner-container"
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    px: 0,
                    py: 0,
                }}
            >
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <Box className='Settings-list'
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            [`& .${listItemButtonClasses.root}`]: {
                                gap: 1.5,
                                borderRadius: '8px',
                            },
                        }}
                    >
                        <List>
                            <ListItem>
                                <ListItemButton selected>
                                    <ListItemText
                                        primary={'General'}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box className='Settings-main-content'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '80%',
                        }}
                    >
                        <Divider />
                        {generalSettings.map((setting, index) => (
                            <React.Fragment key={index}>
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: setting.flexDirection ? setting.flexDirection : 'row',
                                        alignItems: 'center',
                                        gap: 2,
                                        px: 4,
                                        py: 2,
                                    }}
                                >
                                    <Typography sx={{ flexGrow: 1, textWrap: 'nowrap' }}>
                                        {setting.title}
                                    </Typography>
                                    {setting.element}
                                </Box>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Stack className="Footer"
                sx={{
                    width: '100%',
                    height: 'var(--Footer-height)',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        textAlign: "center",
                        pt: '10px',
                        pb: '10px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {SETTINGS_TITLE} - {appName}
                </Typography>
            </Stack>
        </Paper>
    );
}

export default Settings;