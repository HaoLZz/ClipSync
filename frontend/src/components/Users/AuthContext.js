import { authManager } from './authManager';
import { createContext, useContext } from 'react';

const AuthContext = createContext();
const AuthSetContext = createContext();

export function AuthProvider({ children }) {
  let getAuthStatus = authManager.getAuthStatus;
  let signin = authManager.signin;
  let signout = authManager.signout;

  return (
    <AuthContext.Provider value={getAuthStatus}>
      <AuthSetContext.Provider value={{ signin, signout }}>
        {children}
      </AuthSetContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const getAuthStatus = useContext(AuthContext);
  const { signin, signout } = useContext(AuthSetContext);

  if (!signin || !signout || !getAuthStatus) {
    throw new Error('The AuthProvider is missing!');
  }

  return [getAuthStatus, signin, signout];
}
