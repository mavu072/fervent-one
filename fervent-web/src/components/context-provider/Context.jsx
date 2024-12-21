import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase App
import FirebaseApp from '../../firebase/firebaseConfig';

const app = FirebaseApp();
const auth = app.auth;

export const AppContext = createContext();

const getThemePreference = () => {
    const storedPreference = localStorage.getItem('mode');
    return storedPreference ? storedPreference : 'light';
}

const AppProvider = ({ children }) => {
    const [user, isAuthLoading, authError] = useAuthState(auth);
    const [mode, setMode] = useState(getThemePreference());

    useEffect(() => {
        localStorage.setItem('mode', mode);
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