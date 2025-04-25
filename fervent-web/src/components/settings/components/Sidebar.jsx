import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tabs from "./TabList";

const settingsTabNames = Tabs.map(({ id, title }) => ({ id, title }));

function Sidebar({ selectedTab, selectTab }) {
    return (
        <Box className='Settings-sidebar'
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
                {settingsTabNames.map((tab) => (
                    <ListItem>
                        <ListItemButton
                            onClick={() => selectTab(tab.id)}
                            selected={selectedTab === tab.id}
                        >
                            <ListItemText primary={tab.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Sidebar;