import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../UI/Header';
import Footer from '../UI/Footer';
import withRouter from '../UI/withRouter';
import { useAuth } from '../Users/AuthContext';
import { UserSetContext } from '../Users/UserContext';

import { signInFormSchema, validateForm } from '../../utils/validator';

const theme = createTheme();

const LinkRouter = withRouter(Link);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { getAuthStatus, signin } = useAuth();
  const setUser = useContext(UserSetContext);

  const navigate = useNavigate();
  const location = useLocation();
  // the page users tried to visit before they were redirected to login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (getAuthStatus()) {
      // if users were already logined, redirect back to where they came from
      navigate(from, { replace: true });
    }
  }, [from, getAuthStatus, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = validateForm({ email, password }, signInFormSchema);
    if (result.name === 'ValidationError') {
      console.error('Validation Error', result.details);
      return;
    }

    const { userInfo, error } = await signin(email, password);
    if (error) {
      console.error(error);
      return;
    }

    if (getAuthStatus() && userInfo) {
      setUser(userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // redirect uesrs to main app after login
      navigate('/app', { replace: true });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkRouter linkPath="#" variant="body2">
                  Forgot password?
                </LinkRouter>
              </Grid>
              <Grid item>
                <LinkRouter linkPath="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
