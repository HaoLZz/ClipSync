import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/Users/UserContext';
import { AuthProvider } from './components/Users/AuthContext';
import { SocketProvider } from './utils/SocketContext';
import SignUpPage from './components/Onboarding/SignUpPage';
import SignIn from './components/Onboarding/SignInPage';
import LandingPage from './components/Landing/LandingPage';
import AppPage from './components/App/AppPage';
import RequireAuth from './components/Users/RequireAuth';
import UserLogout from './components/Users/UserLogout';

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <CssBaseline />
            <div className="App">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                  path="/app"
                  element={
                    <RequireAuth>
                      <AppPage />
                    </RequireAuth>
                  }
                />
                <Route path="/logout" element={<UserLogout />} />
              </Routes>
            </div>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
