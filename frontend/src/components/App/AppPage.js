import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PrimaryAppBar from './PrimaryAppBar';
import Tabs from '../UI/Tabs';
import ClippingsList from './ClippingsList';

export default function AppPage() {
  const [clippings, setClippings] = useState([]);
  const tabLabels = ['Clipboard', 'Pinned'];

  return (
    <>
      <PrimaryAppBar />
      <Tabs tabLabels={tabLabels}>
        <ClippingsList />
        <ClippingsList />
      </Tabs>
    </>
  );
}
