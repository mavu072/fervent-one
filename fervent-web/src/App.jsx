import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppContext } from './components/context-provider/AppContext';
import ChatPage from './components/chat/ChatPage';
import SnackBarNotification from './components/notification/SnackBar';
import PageLoader from './components/loader/PageLoader';

function App() {
  const { user, isAuthLoading, mode } = useContext(AppContext);
  const defaultTheme = createTheme({ palette: { mode } });
  const navigate = useNavigate();

  const [infoMsg, setInfoMsg] = useState({ message: null, count: 0 });

  function onMessage(newMsg) {
    setInfoMsg((prev) => {
      return {
        message: newMsg,
        count: prev.count + 1,
      }
    });
  }

  useEffect(() => {
    if (!user && !isAuthLoading) {
      onMessage("You are logged out. Redirecting to login...");
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }

    if (user) {
      onMessage(`Authenticated as ${user.displayName ? user.displayName : user.email}`);
    }
  }, [user, isAuthLoading, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {(isAuthLoading || !user) && <PageLoader />}
      {infoMsg.message && <SnackBarNotification key={infoMsg.count} message={infoMsg.message} />}
      {user && <ChatPage />}
    </ThemeProvider>
  );
}
export default App
