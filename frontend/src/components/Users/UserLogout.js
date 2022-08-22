import React, { useContext, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserSetContext } from './UserContext';
import SocketContext from '../App/SocketContext';

export default function UserLogout() {
  const { signout } = useAuth();
  const location = useLocation();
  const setUser = useContext(UserSetContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    signout();
    setUser(null);
    localStorage.clear();
    socket.disconnect((reason) => {
      console.log('User logout', reason);
    });
  }, [signout, setUser, socket]);

  return <Navigate to="/" state={{ from: location }} replace />;
}
