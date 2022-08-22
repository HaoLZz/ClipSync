import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import AsyncImage from '../UI/AsyncImage';

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
}) {
  let imageSkeltonHeight = null;
  if (resolution) {
    const ratio = Number(resolution.trim().split('X')[0]) / 200;
    imageSkeltonHeight = Math.ceil(
      Number(resolution.trim().split('X')[1]) / ratio,
    );
  }

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
        {thumbnail ? (
          <Box
            component="div"
            sx={{ maxWidth: { xs: '60px', sm: '100%' }, marginRight: '5%' }}
          >
            <AsyncImage
              src={thumbnail}
              alt="image thumbnail"
              imageSkeltonHeight={imageSkeltonHeight}
              imageSkeltonWidth={200}
            />
          </Box>
        ) : (
          <Skeleton
            variant="rounded"
            width={210}
            height={118}
            animation="wave"
            sx={{ maxWidth: { xs: '60px', sm: '100%' }, marginRight: '5%' }}
          />
        )}
        <Box>
          <Typography variant="subtitle1" component="p">
            {originalFilename}
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
          <Tooltip title="Download">
            <span>
              <IconButton disabled={Boolean(!downloadLink)}>
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
