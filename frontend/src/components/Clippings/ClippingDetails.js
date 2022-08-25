import React, { useContext, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';

import ImageClipping from './ImageClipping';
import FileClipping from './FileClipping';
import TimeAgo from '../UI/TimeAgo';

import SocketContext from '../App/SocketContext';

function ClippingDetails({ clipping, dispatch, setSocketError }) {
  const socket = useContext(SocketContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const originList = ['desktop', 'tablet', 'mobile'];
  const iconList = [
    <DesktopWindowsIcon fontSize="medium" sx={{ color: '#c7522a' }} />,
    <TabletMacIcon fontSize="medium" sx={{ color: '#58508d' }} />,
    <PhoneIphoneIcon fontSize="medium" sx={{ color: '#003f5c' }} />,
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

  const Text = React.memo(({ content, isPinned, _id, createdAt }) => {
    return (
      <>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          overflow="hidden"
          noWrap={matches}
          paddingY={2}
        >
          {content}
        </Typography>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              variant="rounded"
              sx={{ width: '36px', height: '36px', marginRight: '10px' }}
            >
              {originIcon}
            </Avatar>
            <TimeAgo
              timestamp={createdAt}
              sx={{ fontSize: { xs: '10px', sm: '14px' } }}
            />
          </Box>
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

  const Link = React.memo(({ url, isPinned, thumbnail, _id, createdAt }) => {
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
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            overflow="hidden"
            noWrap={matches}
            paddingY={2}
          >
            {url}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              variant="rounded"
              sx={{ width: '36px', height: '36px', marginRight: '10px' }}
            >
              {originIcon}
            </Avatar>
            <TimeAgo
              timestamp={createdAt}
              sx={{ fontSize: { xs: '10px', sm: '14px' } }}
            />
          </Box>
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

  return (
    <>
      <Card
        sx={{
          padding: '15px 25px',
          width: '100%',
          marginBottom: '20px',
          '&:hover': { backgroundColor: 'rgba(217,217,214, 0.5)' },
        }}
      >
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
        {clipping.type === 'File' && (
          <FileClipping
            {...clipping}
            originIcon={originIcon}
            handleDelete={handleDelete}
            togglePinned={togglePinned}
          />
        )}
      </Card>
    </>
  );
}

export default React.memo(ClippingDetails);
