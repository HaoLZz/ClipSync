import React, { useState, useContext } from 'react';
import { keyframes } from '@emotion/react';
import Container from '@mui/material/Container';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SyncIcon from '@mui/icons-material/Sync';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ClippingDetails from './ClippingDetails';
import { getClipboardText } from '../../utils/clipboard';
import { validURL } from '../../utils/utils';
import SocketContext from './SocketContext';
import UserContext from '../Users/UserContext';

export default function ClippingsList({
  clippings,
  setClippings,
  latestText,
  setLatestText,
  setSocketError,
  showActionButton,
}) {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);
  // const [latestImage, setLatestImage] = useState(null);

  const handleClick = async () => {
    const text = await getClipboardText();
    // const imageBlob = await getClipboardContents();
    if (
      !text ||
      text.trim().length === 0 ||
      (latestText && text.trim() === latestText.trim())
    ) {
      // if copied text is the same as before
      return;
    }
    setLatestText(text);
    const contentType = validURL(text) ? 'Link' : 'Text';
    console.log(`new ${contentType} content`);

    const callback = (res) => {
      if (res.status === 'successful') {
        setClippings((clippings) => [res.data, ...clippings]);
      } else {
        console.error('clipping:create failed');
        setSocketError(res.data);
      }
    };

    const payload =
      contentType === 'Text'
        ? { origin: 'desktop', type: 'Text', content: text, isPinned: false }
        : contentType === 'Link'
        ? {
            origin: 'desktop',
            type: 'Link',
            url: text,
            isPinned: false,
            thumbnail: `https://www.google.com/s2/favicons?sz=64&domain_url=${text}`,
          }
        : {};

    socket.emit('clipping:create', user._id, payload, callback);

    // setLatestImage(imageBlob);
  };

  const spin = keyframes`
  from {
    transform: rotate(0deg) scale(0.7);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
`;

  const scale = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1.1);
  }
`;

  const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

  return (
    <>
      <Container component="main" maxWidth="md">
        {showActionButton && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 2,
              position: 'sticky',
              top: '50px',
              zIndex: '1200',
              backgroundColor: 'rgba(211, 211, 211, 0.4)',
              borderRadius: '10px',
              paddingY: '12px',
              paddingX: '20px',
            }}
          >
            <Box marginRight={2}>
              <ButtonGroup>
                <Tooltip title="Upload Photo" placement="top">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      background: 'rgba(173, 216, 230, 0.5)',
                      animation: `${bounce} 1s ease 2 running`,
                      '&:hover': { animationPlayState: 'paused' },
                    }}
                  >
                    <form hidden>
                      <input hidden accept="image/*" type="file" />
                    </form>

                    <AddPhotoAlternateIcon
                      sx={{ fontSize: { xs: '18px', sm: '24px' } }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Upload File" placement="top">
                  <IconButton color="primary" aria-label="upload file">
                    <FileUploadIcon
                      sx={{ fontSize: { xs: '18px', sm: '24px' } }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Clear All" placement="top">
                  <IconButton color="primary" aria-label="clear all">
                    <ClearIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </Box>
            <Tooltip title="Sync Clip" placement="top">
              <IconButton
                color="secondary"
                sx={{
                  background: 'rgba(182, 149, 192, 0.8)',
                  animation: `${scale} 1.5s 3s 5 alternate ease`,
                  '&:hover': {
                    backgroundColor: 'rgba(182, 149, 192, 0.8)',
                    animation: `${spin} 1.5s infinite alternate ease`,
                  },
                }}
                onClick={handleClick}
              >
                <SyncIcon
                  sx={{
                    fontSize: { xs: '18px', sm: '24px' },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {clippings.map((clipping) => (
            <ClippingDetails
              clipping={clipping}
              setClippings={setClippings}
              setSocketError={setSocketError}
              key={clipping._id}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
