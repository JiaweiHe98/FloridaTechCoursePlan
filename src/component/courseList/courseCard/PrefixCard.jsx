import React, { useContext } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  CardActionArea,
} from '@mui/material';
import { PrefixMapContext } from '../../context/PrefixMapContext';
import InfoIcon from '@mui/icons-material/Info';

const PrefixCard = ({ prefix, courseNum }) => {
  const prefixMap = useContext(PrefixMapContext);

  const prefixInfo = prefixMap[prefix];
  let className;
  let alert;
  let color;

  if (prefixInfo) {
    className = prefixInfo.class;
    alert = prefixInfo.alert;
    color = prefixInfo.color + '';
  }

  return (
    <Box sx={{ display: 'flex', height: '56px' }}>
      <Box
        sx={{
          display: 'flex',
          width: '75px',
          height: '56px',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: '#111111',
          backgroundColor: color ? color : 'blue',
          borderRadius: '4px',
        }}
      >
        <Box>
          <Typography sx={{ color: '#fff' }} variant="h6">
            {prefix}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          pl: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 28,
          }}
        >
          <Typography varient="subtitle1">
            {prefixInfo ? className : `(${prefix})`}
          </Typography>
          {alert && (
            <Box sx={{ ml: '0.5rem' }}>
              <Tooltip title={alert}>
                <IconButton sx={{ p: 0 }} size="xs">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 28,
          }}
        >
          <Typography variant="subtitle1">
            <strong>{courseNum}</strong> {courseNum > 1 ? 'courses' : 'course'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PrefixCard;
