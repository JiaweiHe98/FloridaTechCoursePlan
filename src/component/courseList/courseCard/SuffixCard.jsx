import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import { PrefixMapContext } from '../../context/PrefixMapContext';

const SuffixCard = ({ prefix, suffix, cr, title, sectionNum }) => {
  const prefixMap = useContext(PrefixMapContext);

  const prefixInfo = prefixMap[prefix];
  let color;

  if (prefixInfo) {
    color = prefixInfo.color + '';
  }

  return (
    <Box sx={{ display: 'flex', height: '56px' }}>
      <Box
        sx={{
          backgroundColor: color ? color : 'blue',
          borderRadius: '4px',
          width: '75px',
          height: '56px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Typography sx={{ color: '#fff' }} variant="body1">
            <strong>{prefix}</strong>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            bgcolor: '#eee',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Typography variant="body1">
            <strong>{suffix}</strong>
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
        <Box sx={{ display: 'flex', alignItems: 'center', height: 28 }}>
          <Typography sx={{ lineHeight: '0.85em' }} variant="subtitle1">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 28,
              width: 110,
            }}
          >
            <Typography variant="subtitle1">
              {cr[0] === cr[1] ? (
                <strong>{`${cr[0]}`}</strong>
              ) : (
                <strong>{`${cr[0]} - ${cr[1]}`}</strong>
              )}{' '}
              {cr[1] > 1 ? 'credits' : 'credit'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', height: 28 }}>
            <Typography variant="subtitle1">
              <strong>{sectionNum}</strong>{' '}
              {sectionNum > 1 ? 'sections' : 'section'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SuffixCard;
