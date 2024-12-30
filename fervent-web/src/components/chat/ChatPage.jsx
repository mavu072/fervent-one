import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyMessages from './components/MyMessages';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderCopyRounded';
import MyFiles from './components/MyFiles';
import ServiceProvider from '../context-provider/ServiceContext';

const paneList = [
    { id: "messages", name: "Messages", icon: <QuestionAnswerRoundedIcon /> },
    { id: "files", name: "My Files", icon: <FolderRoundedIcon /> },
]

/**
 * ChatPage.
 * @returns JSX Component
 */
function ChatPage() {
    const [selectedPane, setSelectedPane] = useState(paneList[0].id); // Choose first page by default.

    function onChangeSelectedPane(targetPane) {
        setSelectedPane(targetPane);
    }

    return (
        <ServiceProvider>
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar paneList={paneList} selectedPane={selectedPane} onChangeSelectedPane={onChangeSelectedPane} />
                <Header />
                <Box component="section" className="MainContent" sx={{ flex: 1 }}>
                    {selectedPane === paneList[0].id && <MyMessages />}
                    {selectedPane === paneList[1].id && <MyFiles />}
                </Box>
            </Box>
        </ServiceProvider>
    );
}

export default ChatPage;