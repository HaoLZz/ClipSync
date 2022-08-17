import React, { useContext, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserSetContext } from './UserContext';

export default function UserLogout() {
  const { signout } = useAuth();
  const location = useLocation();
  const setUser = useContext(UserSetContext);

  useEffect(() => {
    signout();
    setUser(null);
  }, [signout, setUser]);

  return <Navigate to="/" state={{ from: location }} replace />;
}
