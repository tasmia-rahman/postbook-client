import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../pages/Home/Home/Home";
import Media from './../../pages/Media/Media/Media';
import About from './../../pages/About/About/About';
import SignUp from './../../pages/SignUp/SignUp';
import Login from './../../pages/Login/Login';
import Error from "../../pages/Error/Error";
import Details from './../../pages/Details/Details';
import PrivateRoute from './../PrivateRoute/PrivateRoute';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/details/:id',
                loader: ({ params }) => fetch(`https://postbook-server.vercel.app/details/${params.id}`),
                element: <PrivateRoute><Details></Details></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        element: <Error></Error>
    }
])