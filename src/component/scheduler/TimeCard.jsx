import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const TimeCard = ({
  loc,
  prefix,
  suffix,
  sectionName,
  timeString,
  bgcolor,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        height: `${loc.height}px`,
        width: `calc(${loc.width}% - 4px)`,
        top: `${loc.top}px`,
        left: `${loc.left}%`,
        m: '2px',
      }}
    >
      <Paper
        variant="outlined"
        sx={{ height: `${loc.height}px`, backgroundColor: bgcolor.color }}
      >
        <Box>
          <Typography variant="body2">{`${prefix} ${suffix}`}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{sectionName}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">{timeString}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TimeCard;
