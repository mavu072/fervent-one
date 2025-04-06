import React, { createContext, useState, useEffect, useCallback } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePreference, saveThemePreference } from "../theme/util/themeUtil";

export const ThemeContext = createContext();

function GlobalThemeProvider({ children }) {
    const [mode, setMode] = useState(getThemePreference());
    const defaultTheme = createTheme({ palette: { mode }, cssVariables: true, });

    useEffect(() => {
        saveThemePreference(mode);
    }, [mode]);

    const toggleColorMode = useCallback(() => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, [setMode]);

    const value = { mode, toggleColorMode };

    return <ThemeContext.Provider value={value} >
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>
}

export default GlobalThemeProvider;