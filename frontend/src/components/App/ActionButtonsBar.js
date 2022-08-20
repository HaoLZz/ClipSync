import React from 'react';
import { keyframes } from '@emotion/react';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import SyncIcon from '@mui/icons-material/Sync';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function ActionButtonsBar({ handleClick }) {
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

              <ImageIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload File" placement="top">
            <IconButton color="primary" aria-label="upload file">
              <FileUploadIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
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
  );
}
