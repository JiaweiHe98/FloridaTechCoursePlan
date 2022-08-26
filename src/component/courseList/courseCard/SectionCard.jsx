import React, { useContext } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { PrefixMapContext } from '../../context/PrefixMapContext';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SectionCard = ({ prefix, suffix, sectionName, sectionDetail, open }) => {
  const prefixMap = useContext(PrefixMapContext);

  const prefixInfo = prefixMap[prefix];
  const closed = sectionDetail.closed;
  const cr = sectionDetail.cr;
  let color;

  if (prefixInfo) {
    color = prefixInfo.color + '';
  }

  return (
    <Box sx={{ display: 'flex', height: '56px', width: '100%' }}>
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
            height: 28,
          }}
        >
          <Typography sx={{ color: '#fff' }} variant="body2">
            <strong>
              {prefix} {suffix}
            </strong>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 28,
            bgcolor: '#eee',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Typography variant="body1">
            <strong>{sectionName}</strong>
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
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 28,
              width: 110,
            }}
          >
            {sectionDetail.email ? (
              <Tooltip
                enterDelay={600}
                enterNextDelay={600}
                sx={{
                  fontSize: '1em',
                  '&:hover': {
                    transition: 'all 0.2s ease-out',
                    transform: 'scale(2, 2)',
                  },
                }}
                title={
                  <Typography variant="caption">
                    {sectionDetail.email}
                  </Typography>
                }
              >
                <Typography sx={{ lineHeight: '0.85em' }} variant="subtitle1">
                  {sectionDetail.instructor}
                </Typography>
              </Tooltip>
            ) : (
              <Typography sx={{ lineHeight: '0.85em' }} variant="subtitle1">
                {sectionDetail.instructor}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', height: 28 }}>
            <Typography sx={{ lineHeight: '0.85em' }} variant="subtitle1">
              <strong style={{ color: closed ? '#e56b6f' : '#000' }}>
                {sectionDetail.occupied}
              </strong>
              {' / '}
              {sectionDetail.capacity}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
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
              {'CRN: '}
              {sectionDetail.crn}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>
    </Box>
  );
};

export default SectionCard;
