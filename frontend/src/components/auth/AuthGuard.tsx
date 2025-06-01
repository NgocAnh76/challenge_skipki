import React from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../api/constant';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default AuthGuard;
