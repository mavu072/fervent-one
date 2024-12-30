import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import FirebaseApp from '../../firebase/firebaseConfig';
import { getThemePreference, saveThemePreference } from '../theme/util/themeUtil';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const app = FirebaseApp();
    const auth = app.auth;
    const [user, isAuthLoading, authError] = useAuthState(auth);
    const [mode, setMode] = useState(getThemePreference());

    useEffect(() => {
        saveThemePreference(mode);
    }, [mode]);

    const toggleColorMode = useCallback(() => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, [setMode]);

    const value = { user, app, auth, isAuthLoading, authError, mode, toggleColorMode };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;