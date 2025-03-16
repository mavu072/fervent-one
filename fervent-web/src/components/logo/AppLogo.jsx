import React from "react";
import { logoShortStyle, logoShortLight, logoShortDark, logoLight, logoDark, logoStyle } from '../ui/logoUtil';
import { appName } from '../../config/appConfig';

function AppLogoIcon({ mode }) {
    return (
        <img
            src={mode === 'light' ? logoShortLight : logoShortDark}
            style={logoShortStyle}
            alt={appName}
        />
    );
}

export function AppLogoHorizontal({ mode }) {
    return (
        <img
            src={mode === 'light' ? logoLight : logoDark}
            style={logoStyle}
            alt={appName}
        />
    );
}

export default AppLogoIcon;