import React from 'react';
import Divider from '@mui/material/Divider';
import { appName } from '../../config/appConfig';
import BackButton from './components/BackButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from '../landing-page/components/Footer';

function PrivacyPolicyPage() {
    return (
        <React.Fragment>
            <>
                <title>
                    Privacy Policy | {appName}
                </title>
            </>
            <BackButton />
            <PrivacyPolicy />
            <Divider />
            <Footer />
        </React.Fragment>
    );
}

export default PrivacyPolicyPage;