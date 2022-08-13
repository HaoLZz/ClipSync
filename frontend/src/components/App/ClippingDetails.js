import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function ClippingDetails({ clipping }) {
  return (
    <>
      <Card sx={{ padding: '15px 25px', width: '100%', marginBottom: '20px' }}>
        <Typography variant="body1" component="p" gutterBottom>
          {clipping.content}
        </Typography>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Avatar variant="rounded">
            <DesktopWindowsOutlinedIcon />
          </Avatar>
          <ButtonGroup>
            <IconButton>
              <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton>
              <PushPinOutlinedIcon />
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Card>
    </>
  );
}
