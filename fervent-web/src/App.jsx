import React, { useContext } from 'react';
import { AppContext } from './components/context-provider/Context';
import ChatInterface from './components/chat/ChatInterface';
import SnackBarNotification from './components/notification/SnackBar';

function App() {
  const { user, isAuthLoading } = useContext(AppContext);

  return (
    <>
      {isAuthLoading && <SnackBarNotification message={`Signing you in.`} />}
      {user && <SnackBarNotification message={`Authenticated as ${user.displayName ? user.displayName : user.email}`} />}
      <ChatInterface />
    </>
  );
}
export default App
