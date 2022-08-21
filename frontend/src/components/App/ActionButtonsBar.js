import React from 'react';
import { keyframes } from '@emotion/react';
import { green } from '@mui/material/colors';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import SyncIcon from '@mui/icons-material/Sync';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function ActionButtonsBar({
  handleSync,
  handleImageUpload,
  isImageUploading,
}) {
  const spin = keyframes`
  from {
    transform: rotate(0deg) scale(0.7);
  }
  to {
    transform: rotate(360deg) scale(1.1);
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
    <Box
      aria-label="action buttons bar"
      sx={{
        display: 'flex',
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
      <ButtonGroup
        sx={{ flex: '1 1 70%', display: 'flex', columnGap: '15px' }}
        component="div"
      >
        <Box sx={{ position: 'relative' }}>
          <Tooltip title="Upload Photo" placement="top">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                animation: `${bounce} 1s ease 2 running`,
                '&:hover': {
                  animationPlayState: 'paused',
                  background: 'rgba(173, 216, 230, 0.5)',
                },
              }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
              />
              <ImageIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
            </IconButton>
          </Tooltip>
          {isImageUploading && (
            <CircularProgress
              size={32}
              sx={{
                color: green[500],
                position: 'absolute',
                top: 3,
                left: 3,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        <Tooltip title="Upload File" placement="top">
          <IconButton
            color="primary"
            aria-label="upload file"
            sx={{
              '&:hover': {
                background: 'rgba(173, 216, 230, 0.5)',
              },
            }}
          >
            <FileUploadIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear All" placement="top">
          <IconButton
            color="warning"
            aria-label="clear all"
            sx={{ '&:hover': { backgroundColor: 'rgba(250, 181, 127, 0.5)' } }}
          >
            <ClearIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <Box
        sx={{ flex: '1 1 30%', display: 'flex', flexDirection: 'row-reverse' }}
      >
        <Tooltip title="Sync Clip" placement="top">
          <IconButton
            color="secondary"
            aria-label="sync clipboard"
            sx={{
              backgroundColor: 'rgba(182, 149, 192, 0.8)',
              boxShadow: '0 0.1em #B695C0',
              '&:hover': {
                backgroundColor: 'rgba(182, 149, 192, 0.6)',
              },
              '&:active': {
                transform: 'translateY(0.1em)',
                boxShadow: '0 0.05em #B695C0',
              },
            }}
            onClick={handleSync}
          >
            <SyncIcon
              sx={{
                fontSize: { xs: '18px', sm: '24px' },
                animation: `${spin} 1.5s 3s 5 alternate ease`,
                '&:hover': {
                  animationPlayState: 'paused',
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
