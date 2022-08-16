import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Message({
  children,
  severity = 'warning',
  title = 'Warning',
  handleClose = (f) => f,
  ...props
}) {
  return (
    <Alert severity={severity} onClose={handleClose} {...props}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
}
