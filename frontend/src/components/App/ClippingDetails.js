import React from 'react';
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

export default function ClippingDetails({ clipping }) {
  const originList = ['desktop', 'tablet', 'phone'];
  const iconList = [
    <DesktopWindowsOutlinedIcon />,
    <TabletMacOutlinedIcon />,
    <PhoneIphoneOutlinedIcon />,
  ];
  const index = originList.findIndex((origin) => origin === clipping.origin);

  const originIcon = iconList[index];

  const Text = ({ content, isPinned }) => {
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
            <IconButton>
              <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton>
              {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </>
    );
  };

  const Link = ({ url, isPinned, thumbnail }) => {
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
            <IconButton>
              <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton>
              {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </>
    );
  };

  const Image = ({ format, content, isPinned, resolution, size }) => {
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
            src="https://placeholder.pics/svg/100x100/FFB01E"
            alt="image thumbnail"
            variant="square"
            sx={{ width: '100px', height: '100px', marginRight: '5%' }}
          />
          <Box>
            <Typography variant="subtitle1" component="p">
              {content}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {resolution}
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
            <IconButton>
              <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton>
              <DownloadOutlinedIcon />
            </IconButton>
            <IconButton>
              {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </>
    );
  };

  const File = ({ format, content, isPinned, size }) => {
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
            <IconButton>
              <DownloadOutlinedIcon />
            </IconButton>
            <IconButton>
              {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </>
    );
  };
  return (
    <>
      <Card sx={{ padding: '15px 25px', width: '100%', marginBottom: '20px' }}>
        {clipping.type === 'Text' && <Text {...clipping} />}
        {clipping.type === 'Link' && <Link {...clipping} />}
        {clipping.type === 'Image' && <Image {...clipping} />}
        {clipping.type === 'File' && <File {...clipping} />}
      </Card>
    </>
  );
}
