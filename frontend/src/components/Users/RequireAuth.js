import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth({ children }) {
  const { getAuthStatus } = useAuth();
  const location = useLocation();
  if (!getAuthStatus()) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}
