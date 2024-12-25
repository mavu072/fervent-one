import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyMessages from './components/MyMessages';
import { AppContext } from '../context-provider/Context';
import MessageRepository from '../../repository/MessageRepository';
import MessageService from '../../service/MessageService';

/**
 * ChatPage.
 * @returns JSX Component
 */
function ChatPage() {
    const { user, app } = useContext(AppContext);
    const messageRepository = new MessageRepository(app, user.uid);
    const messageService = new MessageService(messageRepository);

    // Todo: Add Control Toggle Selected Pane

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100dvh'
        }}>
            <Sidebar />
            <Header />
            <Box component="section" className="MainContent" sx={{ flex: 1 }}>
                {user && <MyMessages user={user} messageService={messageService} />}
            </Box>
        </Box>
    );
}

export default ChatPage;