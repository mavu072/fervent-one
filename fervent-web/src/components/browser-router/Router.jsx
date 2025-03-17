import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import SignInPage from '../login/SignInPage';
import LandingPage from '../landing-page/LandingPage';
import ErrorPage, { PageNotFound } from '../error/RouteErrors';
// import PrivacyPage from '../../legal/PrivacyPage';
// import TermsOfServicePage from '../../legal/TermsOfServicePage';
// import AboutPage from '../../about/AboutPage';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/login',
        element: <SignInPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/home/*', // '*' To accommodate the nested routes.
        element: <App />,
        errorElement: <ErrorPage />
    },
    // {
    //     path: '/privacy-policy',
    //     element: <PrivacyPage />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: '/terms-and-conditions',
    //     element: <TermsOfServicePage />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: '/about',
    //     element: <AboutPage />,
    //     errorElement: <ErrorPage />
    // },
    {
        path: '*',
        element: <PageNotFound />,
    }
]);

export default Router;