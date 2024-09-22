import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import UserContextProvider from './context/UserContextProvider';

function Layout() {
  const location = useLocation();
  
  // Exclude header and footer on login or signup routes
  

  return (
    <>
       <Header /> {/* Conditionally render Header */}
      <Outlet />
       {/* Conditionally render Footer */}
    </>
  );
}

export default Layout;
