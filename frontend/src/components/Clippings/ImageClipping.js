import React from 'react';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import AsyncImage from '../UI/AsyncImage';
import TimeAgo from '../UI/TimeAgo';

function ImageClipping({
  _id,
  thumbnail,
  format,
  originalFilename,
  downloadLink,
  isPinned,
  resolution,
  size,
  originIcon,
  togglePinned,
  handleDelete,
  createdAt,
}) {
  const MetaText = styled(Typography)(({ theme }) => ({
    display: 'inline-block',
    padding: `${theme.spacing(0.2)} ${theme.spacing(1)}`,
    marginRight: theme.spacing(0.8),
    color: theme.palette.info.contrastText,
    backgroundColor: `${alpha(theme.palette.info.main, 0.6)}`,
    borderRadius: theme.shape.borderRadius,
    textTransform: 'uppercase',
  }));

  const fileUrl = `${process.env.REACT_APP_HTTPS_URL}${downloadLink}`;
  return (
    <>
      <Box
        component="div"
        sx={{
          marginBottom: '15px',
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
        }}
      >
        <Box component="div" sx={{ maxWidth: '200px', marginRight: '5%' }}>
          <AsyncImage
            src={thumbnail}
            alt="image thumbnail"
            imageSkeltonWidth={200}
          />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            component="p"
            gutterBottom
            fontWeight="700"
          >
            {originalFilename}
          </Typography>
          <Box
            sx={{ display: { xs: 'flex', sm: 'block' }, marginBottom: '10px' }}
            columnGap={2}
          >
            <MetaText variant="body2">{resolution}</MetaText>
            <MetaText variant="body2">{format}</MetaText>
            <MetaText variant="body2">{size}</MetaText>
          </Box>
        </Box>
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
          <Tooltip title="Download">
            <span>
              <IconButton
                component="a"
                href={fileUrl}
                download={originalFilename}
                disabled={Boolean(!downloadLink)}
              >
                <DownloadOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Pin">
            <span>
              <IconButton
                onClick={() => togglePinned(_id, isPinned)}
                disabled={Boolean(!downloadLink)}
              >
                {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton
                onClick={() => handleDelete(_id)}
                disabled={Boolean(!downloadLink)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default React.memo(ImageClipping);
