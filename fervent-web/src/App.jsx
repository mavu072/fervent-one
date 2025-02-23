import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import SnackBarNotification from './components/notification/SnackBar';
import PageLoader from './components/loader/PageLoader';
import { AppContext } from './components/context-provider/AppContext';

/**
 * App.
 * @returns JSX Element.
 */
function App() {
  const { user, isAuthLoading, infoMsg, onInfoMessage } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isAuthLoading) {
      onInfoMessage("You are logged out. Redirecting to login...");
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }

    if (user) {
      onInfoMessage(`Authenticated as ${user.displayName ? user.displayName : user.email}`);
    }
  }, [user, isAuthLoading, navigate, onInfoMessage]);

  return (
    <React.Fragment>
      {(isAuthLoading || !user) && <PageLoader />}
      {infoMsg.message && <SnackBarNotification key={infoMsg.count} message={infoMsg.message} />}
      {user && <Home />}
    </React.Fragment>
  );
}
export default App
