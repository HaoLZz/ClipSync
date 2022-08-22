import React, { useContext, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';

import ImageClipping from './ImageClipping';

import SocketContext from '../App/SocketContext';

function ClippingDetails({ clipping, dispatch, setSocketError }) {
  const socket = useContext(SocketContext);

  const originList = ['desktop', 'tablet', 'phone'];
  const iconList = [
    <DesktopWindowsOutlinedIcon />,
    <TabletMacOutlinedIcon />,
    <PhoneIphoneOutlinedIcon />,
  ];
  const index = originList.findIndex((origin) => origin === clipping.origin);

  const originIcon = iconList[index];

  const togglePinned = useCallback(
    (clippingId, isPinned) => {
      const callback = (res) => {
        if (res.status === 'successful') {
          dispatch({ type: 'UPDATE_CLIPPING', payload: res.data });
        } else {
          console.error('clipping:update failed');
          setSocketError(res.data);
        }
      };

      socket.emit(
        'clipping:update',
        clippingId,
        { isPinned: !isPinned },
        callback,
      );
    },
    [dispatch, setSocketError, socket],
  );

  const handleDelete = useCallback(
    (clippingId) => {
      const callback = (res) => {
        if (res.status === 'successful') {
          dispatch({ type: 'DELETE_CLIPPING', payload: res.data });
        } else {
          console.error('clipping:delete failed');
          setSocketError(res.data);
        }
      };

      socket.emit('clipping:delete', clippingId, callback);
    },
    [dispatch, setSocketError, socket],
  );

  const Text = React.memo(({ content, isPinned, _id }) => {
    return (
      <>
        <Typography variant="body1" component="p" gutterBottom>
          {content}
        </Typography>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Avatar variant="rounded">{originIcon}</Avatar>
          <ButtonGroup>
            <Tooltip title="Copy">
              <IconButton>
                <ContentCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pin">
              <IconButton onClick={() => togglePinned(_id, isPinned)}>
                {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(_id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </>
    );
  });

  const Link = React.memo(({ url, isPinned, thumbnail, _id }) => {
    return (
      <>
        <Box
          component="div"
          sx={{
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={thumbnail}
            alt="link thumbnail"
            variant="square"
            sx={{ marginRight: '5%' }}
          />
          <Typography variant="body1" component="p" gutterBottom>
            {url}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Avatar variant="rounded">{originIcon}</Avatar>
          <ButtonGroup>
            <Tooltip title="Copy">
              <IconButton>
                <ContentCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pin">
              <IconButton onClick={() => togglePinned(_id, isPinned)}>
                {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(_id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </>
    );
  });

  const File = React.memo(({ _id, format, content, isPinned, size }) => {
    return (
      <>
        <Box
          component="div"
          sx={{
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src="https://placeholder.pics/svg/48x48/FFB01E-FF6DC4"
            alt="file thumbnail"
            variant="square"
            sx={{ marginRight: '5%' }}
          />
          <Box>
            <Typography variant="subtitle1" component="p">
              {content}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {format}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {size}
            </Typography>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Avatar variant="rounded">{originIcon}</Avatar>
          <ButtonGroup>
            <Tooltip title="Download">
              <IconButton>
                <DownloadOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pin">
              <IconButton onClick={() => togglePinned(_id, isPinned)}>
                {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(_id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </>
    );
  });
  return (
    <>
      <Card sx={{ padding: '15px 25px', width: '100%', marginBottom: '20px' }}>
        {clipping.type === 'Text' && <Text {...clipping} />}
        {clipping.type === 'Link' && <Link {...clipping} />}
        {clipping.type === 'Image' && (
          <ImageClipping
            {...clipping}
            originIcon={originIcon}
            handleDelete={handleDelete}
            togglePinned={togglePinned}
          />
        )}
        {clipping.type === 'File' && <File {...clipping} />}
      </Card>
    </>
  );
}

export default React.memo(ClippingDetails);
