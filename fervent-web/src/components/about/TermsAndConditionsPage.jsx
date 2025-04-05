import React from 'react';
import Divider from '@mui/material/Divider';
import { appName } from '../../config/appConfig';
import BackButton from './components/BackButton';
import TermsAndConditions from './components/terms-page/TermsAndConditions';
import Footer from './components/landing-page/Footer';

function TermsAndConditionsPage() {
    return (
        <React.Fragment>
            <>
                <title>
                    Terms and Conditions | {appName}
                </title>
            </>
            <BackButton />
            <TermsAndConditions />
            <Divider />
            <Footer />
        </React.Fragment>
    );
}

export default TermsAndConditionsPage;