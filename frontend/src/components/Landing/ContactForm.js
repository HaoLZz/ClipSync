import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  contactUsFormSchema,
  validateFormField,
  validateForm,
} from '../../utils/validator';

export default function ContactForm() {
  // const [email, setEmail] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [subject, setSubject] = useState('');
  // const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    fullName: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    emailError: '',
    fullNameError: '',
    subjectError: '',
    messageError: '',
  });
  const { email, fullName, subject, message } = values;
  const { emailError, fullNameError, subjectError, messageError } = errors;
  const [error, setError] = useState('');

  const handleChange = (prop) => (event) => {
    const result = validateFormField(
      prop,
      event.target.value,
      contactUsFormSchema,
    );
    if (result.name === 'ValidationError') {
      setErrors({ ...errors, [`${prop}Error`]: result.details[0].message });
    } else {
      setErrors({ ...errors, [`${prop}Error`]: '' });
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const result = validateForm(
      { email, fullName, subject, message },
      contactUsFormSchema,
    );
    if (result.name === 'ValidationError') {
      console.error('Validation Error', result.details);
      return;
    }
    console.log({ email, fullName, subject, message });
    resetForm();
  };

  const resetForm = () => {
    setValues({
      email: '',
      fullName: '',
      subject: '',
      message: '',
    });
    setErrors({
      emailError: '',
      fullNameError: '',
      subjectError: '',
      messageError: '',
    });
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '10px',
        maxWidth: '700px',
        margin: '30px auto',
      }}
    >
      <Typography variant="h4" textAlign="center">
        Contact Us
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          marginTop: '30px',
        }}
      >
        <TextField
          label="Full Name"
          required
          id="full-name"
          variant="outlined"
          fullWidth
          error={Boolean(fullNameError)}
          helperText={fullNameError}
          sx={{
            marginBottom: '20px',
          }}
          value={fullName}
          onChange={handleChange('fullName')}
        />

        <TextField
          label="Email"
          error={Boolean(emailError)}
          required
          id="email"
          variant="outlined"
          helperText={emailError}
          fullWidth
          sx={{
            marginBottom: '20px',
          }}
          value={email}
          onChange={handleChange('email')}
        />

        <TextField
          label="Subject"
          required
          id="subject"
          variant="outlined"
          fullWidth
          error={Boolean(subjectError)}
          helperText={subjectError}
          sx={{
            marginBottom: '20px',
          }}
          value={subject}
          onChange={handleChange('subject')}
        />

        <TextField
          multiline
          id="message"
          aria-label="minimum height"
          minRows={6}
          placeholder="Enter a message"
          spellCheck
          fullWidth
          error={Boolean(messageError)}
          helperText={messageError}
          sx={{
            marginBottom: '20px',
            fontSize: '16px',
          }}
          value={message}
          onChange={handleChange('message')}
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ width: '200px', fontSize: '16px', marginRight: '10px' }}
          onClick={submitForm}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: '200px', fontSize: '16px' }}
          onClick={resetForm}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}
