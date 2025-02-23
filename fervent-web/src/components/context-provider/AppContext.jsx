import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import FirebaseApp from '../../firebase/firebaseConfig';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const app = FirebaseApp();
    const auth = app.auth;
    const [user, isAuthLoading, authError] = useAuthState(auth);
    const [infoMsg, setInfoMsg] = useState({ message: null, count: 0 });

    useEffect(() => {
        if (authError) console.log("Auth Error:", authError);
    }, [authError]);

    const onInfoMessage = useCallback((newInfoMsg) => {
        setInfoMsg((prev) => {
            return {
              message: newInfoMsg,
              count: prev.count + 1,
            }
          });
    }, [setInfoMsg])

    const value = { user, app, auth, isAuthLoading, infoMsg, onInfoMessage };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;