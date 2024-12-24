import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './components/context-provider/Context';
import ChatInterface from './components/chat/ChatInterface';
import SnackBarNotification from './components/notification/SnackBar';
import PageLoader from './components/loader/PageLoader';

function App() {
  const { user, isAuthLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <>
      {isAuthLoading && <PageLoader />}
      {user && <SnackBarNotification message={`Authenticated as ${user.displayName ? user.displayName : user.email}`} />}
      {user && <ChatInterface />}
    </>
  );
}
export default App
