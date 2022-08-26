import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../UI/Header';
import Footer from '../UI/Footer';
import SnackbarMessage from '../UI/SnackbarMessage';
import withRouter from '../UI/withRouter';
import apiRequest from '../../utils/api';
import {
  signUpFormSchema,
  validateFormField,
  validateForm,
} from '../../utils/validator';

const theme = createTheme();

const LinkRouter = withRouter(Link);

export default function SignUpPage() {
  const [values, setValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    emailError: '',
    firstNameError: '',
    lastNameError: '',
    passwordError: '',
  });

  const { email, firstName, lastName, password } = values;
  const { emailError, firstNameError, lastNameError, passwordError } = errors;

  const [alert, setAlert] = useState({ severity: '', text: '' });
  const [open, setOpen] = useState(false);
  const { severity, text } = alert;

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    const result = validateFormField(
      prop,
      event.target.value,
      signUpFormSchema,
    );
    if (result.name === 'ValidationError') {
      setErrors({ ...errors, [`${prop}Error`]: result.details[0].message });
    } else {
      setErrors({ ...errors, [`${prop}Error`]: '' });
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // form data validation
      const result = validateForm(
        { firstName, lastName, email, password },
        signUpFormSchema,
      );
      if (result.name === 'ValidationError') {
        console.error('Validation Error', result.details);
        setOpen(true);
        setAlert({
          text: 'Form data invalid. Please edit your information!',
          severity: 'warning',
        });
        return;
      }

      const userInfo = await apiRequest('api/users', 'POST', {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });
      if (userInfo && userInfo._id) {
        setOpen(true);
        setAlert({
          text: 'Sign up successful. Now redirecting to sign-in page',
          severity: 'success',
        });
        // upon successful registration, redirect to signin page
        setTimeout(() => navigate('/sign-in', { replace: true }), 3000);
      }
    } catch (err) {
      console.error(err);
      setOpen(true);
      setAlert({
        text: 'Sign up failed.Please try again',
        severity: 'error',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grow in={true}>
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    error={Boolean(firstNameError)}
                    id="firstName"
                    label="First Name"
                    helperText={firstNameError}
                    value={firstName}
                    onChange={handleChange('firstName')}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(lastNameError)}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    helperText={lastNameError}
                    value={lastName}
                    onChange={handleChange('lastName')}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(emailError)}
                    id="email"
                    label="Email Address"
                    name="email"
                    helperText={emailError}
                    value={email}
                    onChange={handleChange('email')}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(passwordError)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    helperText={passwordError}
                    value={password}
                    onChange={handleChange('password')}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <LinkRouter linkPath="/sign-in" variant="body2">
                    Already have an account? Sign in
                  </LinkRouter>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer sx={{ mt: 5 }} />
          <SnackbarMessage
            open={open}
            setOpen={setOpen}
            text={text}
            severity={severity}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          />
        </Container>
      </Grow>
    </ThemeProvider>
  );
}
