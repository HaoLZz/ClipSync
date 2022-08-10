import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
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
          sx={{
            marginBottom: '20px',
          }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          label="Email"
          error={error ? true : false}
          required
          id="email"
          variant="outlined"
          helperText={error ? error.message : null}
          fullWidth
          sx={{
            marginBottom: '20px',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Subject"
          required
          id="subject"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: '20px',
          }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          multiline
          id="message"
          aria-label="minimum height"
          minRows={6}
          placeholder="Enter a message"
          textAlign="center"
          spellCheck
          fullWidth
          sx={{
            marginBottom: '20px',
            fontSize: '16px',
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ width: '200px', fontSize: '16px' }}
          onClick={submitForm}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
