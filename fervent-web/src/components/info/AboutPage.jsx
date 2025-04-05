import React from 'react';
import Divider from '@mui/material/Divider';
import { orgName } from "../../config/appConfig";
import Introduction from './components/Introduction';
import BackButton from './components/BackButton';
import Footer from '../landing-page/components/Footer';
import ContactUs from './components/Contact';
import OurStory from './components/Story';
import OurMission from './components/Mission';

function AboutPage() {
    return (
        <React.Fragment>
            <>
                <title>
                    About Us | {orgName}
                </title>
            </>
            <BackButton />
            <Introduction />
            <Divider />
            <OurStory />
            <Divider />
            <OurMission />
            <Divider />
            <ContactUs />
            <Divider />
            <Footer />
        </React.Fragment>
    );
}

export default AboutPage;