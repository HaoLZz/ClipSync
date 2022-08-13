import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ClippingDetails from './ClippingDetails';

export default function ClippingsList({ clippings }) {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {clippings.map((clipping, i) => (
          <ClippingDetails clipping={clipping} key={i} />
        ))}
      </Box>
    </Container>
  );
}
