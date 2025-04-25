import React, { useState } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {
    appName,
    SETTINGS_TITLE
} from "../../config/appConfig";
import Tabs from "./components/TabList";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

/**
 * Settings Page.
 * @returns JSX Component.
 */
function Settings() {
    const [selectedTab, setSelectedTab] = useState(Tabs[0].id);

    function handleClickTab(tabId) {
        setSelectedTab(tabId);
    }

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
                    <Sidebar
                        selectedTab={selectedTab}
                        selectTab={handleClickTab}
                    />
                    <Divider orientation="vertical" flexItem />
                    <Box
                        className='Settings-main-content'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '80%',
                        }}
                    >
                        {Tabs.map((tab) => {
                            if (selectedTab === tab.id) {
                                return (
                                    <React.Fragment>
                                        {tab.element}
                                    </React.Fragment>
                                );
                            } else {
                                return (<></>);
                            }
                        })}
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Footer />
        </Paper>
    );
}

export default Settings;