import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import Typography from '@mui/material/Typography';

export default function TimeAgo({ timestamp, ...props }) {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date, { includeSeconds: true });
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <Typography variant="body2" title={timestamp} {...props}>
      {timeAgo}
    </Typography>
  );
}
