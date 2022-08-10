import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimarySearchAppBar from './components/AppBar';
import { UserProvider } from './components/Users/UserContext';
import SignUpPage from './components/Onboarding/SignUpPage';
import SignIn from './components/Onboarding/SignInPage';
import LandingPage from './components/Landing/LandingPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <CssBaseline />
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/app" element={<PrimarySearchAppBar />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
