import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import SignIn from '../login/SignIn';
import LandingPage from '../landing-page/LandingPage';
import PageNotFound from '../error/RouteErrors';
// import Privacy from '../../legal/Privacy';
// import TermsOfService from '../../legal/TermsOfService';
// import About from '../../about/About';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        errorElement: <PageNotFound />
    },
    {
        path: '/login',
        element: <SignIn />
    },
    {
        path: '/home',
        element: <App />
    },
    // {
    //     path: '/privacy',
    //     element: <Privacy />
    // },
    // {
    //     path: '/terms',
    //     element: <TermsOfService />
    // },
    // {
    //     path: '/about',
    //     element: <About />
    // }
]);

export default Router;