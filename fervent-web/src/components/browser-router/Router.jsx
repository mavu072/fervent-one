import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import SignInPage from '../login/SignInPage';
import LandingPage from '../landing-page/LandingPage';
import ErrorPage, { PageNotFound } from '../error/RouteErrors';
import AboutPage from '../info/AboutPage';
import TermsAndConditionsPage from '../info/TermsAndConditionsPage';
import PrivacyPolicyPage from '../info/PrivacyPolicyPage';

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
    {
        path: '/about',
        element: <AboutPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/terms-and-conditions',
        element: <TermsAndConditionsPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '*',
        element: <PageNotFound />,
    }
]);

export default Router;