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

function FileClipping({
  _id,
  format,
  originalFilename,
  downloadLink,
  isPinned,
  size,
  originIcon,
  togglePinned,
  handleDelete,
}) {
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
            {originalFilename}
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
}

export default React.memo(FileClipping);
