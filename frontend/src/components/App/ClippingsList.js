import React, { useState } from 'react';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import SyncIcon from '@mui/icons-material/Sync';
import Box from '@mui/material/Box';
import ClippingDetails from './ClippingDetails';
import { getClipboardText, getClipboardContents } from '../../utils/clipboard';

export default function ClippingsList({
  clippings,
  setClippings,
  latestText,
  setLatestText,
  showActionButton,
}) {
  const [loading, setLoading] = useState(false);
  // const [latestImage, setLatestImage] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    const text = await getClipboardText();
    // const imageBlob = await getClipboardContents();
    if (
      !text ||
      text.trim().length === 0 ||
      (latestText && text.trim() === latestText.trim())
    ) {
      setLoading(false);
      return;
    }
    setLatestText(text);
    console.log('new text content');
    setClippings((clippings) => [
      { origin: 'desktop', type: 'Text', content: text, isPinned: false },
      ...clippings,
    ]);
    // setLatestImage(imageBlob);
    setLoading(false);
  };
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
        {/* <img id="image-field" alt="paste" width="48px" height="48px" /> */}
        {showActionButton && (
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <LoadingButton
              sx={{ marginBottom: 2 }}
              color="secondary"
              aria-label="sync"
              size="medium"
              startIcon={<SyncIcon fontSize="large" />}
              variant="contained"
              loading={loading}
              loadingPosition="start"
              onClick={handleClick}
            >
              Sync Clipboard
            </LoadingButton>
          </Box>
        )}
        {clippings.map((clipping, i) => (
          <ClippingDetails clipping={clipping} key={i} />
        ))}
      </Box>
    </Container>
  );
}
