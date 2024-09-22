import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import AuthLayout from './AuthLayout.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginForm from './pages/LoginForm.jsx';  // Corrected typo from LoginFrom
import Home from './components/Home/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Card from './components/Card/Card.jsx'; // Importing Card component
import ProspectForm from './pages/ProsprectForm.jsx';  // Importing ProspectForm component
import ProspectDetails from './pages/ProspectDetails.jsx'; // Importing ProspectDetails component

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Main layout with header and footer
    children: [
      {
        path: '', // Redirect to login page by default
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'home',
        element: <Home />, // Home page
      },
      {
        path: 'dashboard',
        element: <Dashboard />, // Dashboard page
      },
      {
        path: 'card', // Card page
        element: <Card />,
      },
    ],
  },
  {
    path: '/signup',
    element: (
      <AuthLayout>
        <SignupPage />  {/* No header and footer */}
      </AuthLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <LoginForm />  {/* No header and footer */}
      </AuthLayout>
    ),
  },
  {
    path: '/book-meeting',
    element: <ProspectForm />,  // Form to book a meeting
  },
  {
    path: '/prospect-details',
    element: <ProspectDetails />,  // Prospect details page
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
