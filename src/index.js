import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import Landing from './landing/landing';
import Login from './authentication/login';
import Signup from './authentication/signup';
import Dashboard from './Dashboard/dashboard';
import Aboutus from './aboutus';
import Contactus from './contactus';

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/about-us",
    element: <Aboutus />
  },
  {
    path: "/contact-us",
    element: <Contactus />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes} />
  </React.StrictMode>
);
