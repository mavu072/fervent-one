import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import SignInPage from '../login/SignInPage';
import LandingPage from '../about/LandingPage';
import AboutPage from '../about/AboutPage';
import TermsAndConditionsPage from '../about/TermsAndConditionsPage';
import PrivacyPolicyPage from '../about/PrivacyPolicyPage';
import ErrorPage, { PageNotFound } from '../error/RouteErrors';

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