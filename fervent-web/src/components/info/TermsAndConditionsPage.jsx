import React from 'react';
import Divider from '@mui/material/Divider';
import { appName } from '../../config/appConfig';
import BackButton from './components/BackButton';
import TermsAndConditions from './components/TermsAndConditions';
import Footer from '../landing-page/components/Footer';

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