import React from 'react';
import Divider from '@mui/material/Divider';
import { orgName } from "../../config/appConfig";
import Introduction from './components/about-page/Introduction';
import BackButton from './components/BackButton';
import Footer from './components/landing-page/Footer';
import ContactUs from './components/about-page/Contact';
import OurStory from './components/about-page/Story';
import OurMission from './components/about-page/Mission';

function AboutPage() {
    return (
        <React.Fragment>
            <>
                <title>
                    About Us – {orgName}
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