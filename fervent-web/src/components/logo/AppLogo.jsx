import React from "react";
import { logoShortStyle, logoShortLight, logoShortDark, logoLight, logoDark, logoStyle } from '../../util/logoUtil';
import { appName } from '../../util/appNameUtil';

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