import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/Users/UserContext';
import { AuthProvider } from './components/Users/AuthContext';
import SignUpPage from './components/Onboarding/SignUpPage';
import SignIn from './components/Onboarding/SignInPage';
import LandingPage from './components/Landing/LandingPage';
import AppPage from './components/App/AppPage';
import RequireAuth from './components/Users/RequireAuth';

function App() {
  return (
    <UserProvider>
      <AuthProvider>
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
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
