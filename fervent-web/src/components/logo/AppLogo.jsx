import React from "react";
import { logoShortStyle, logoShortLight, logoShortDark } from '../../util/logoUtil';
import { appName } from '../../util/appNameUtil';

function LogoSmall({ mode }) {
    return (
        <img
            src={mode === 'light' ? logoShortLight : logoShortDark}
            style={logoShortStyle}
            alt={appName}
        />
    );
}

export default LogoSmall;