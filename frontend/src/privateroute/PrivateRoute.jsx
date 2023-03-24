import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;
  return (
    isAuthenticated ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
