import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = ({ text, size, ...props }) => {
  return (
    <Box {...props}>
      <CircularProgress color="secondary" size={size} />
      {text}
    </Box>
  );
};
