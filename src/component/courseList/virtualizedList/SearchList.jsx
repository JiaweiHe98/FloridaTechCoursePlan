import React, { memo } from 'react';
import {
  Box,
  ListItem,
  Paper,
  ListItemButton,
  Typography,
  Avatar,
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import SuffixCard from '../courseCard/SuffixCard';

const renderRow = memo(({ index, style, data }) => {
  const result = data.searchResults[index];
  const onSetSuffixHandler = data.onSetSuffixHandler;
  const onSetPrefixHandler = data.onSetPrefixHandler;
  const { prefix, suffix, sectionNum, cr, title } = result;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <Box sx={{ flexGrow: 1, p: '0.5rem', pt: '4px', pb: '4px' }}>
        <Paper variant="outlined">
          <ListItemButton
            onClick={() => {
              onSetPrefixHandler(prefix);
              onSetSuffixHandler(suffix);
            }}
          >
            <SuffixCard
              prefix={prefix}
              suffix={suffix}
              cr={cr}
              title={title}
              sectionNum={sectionNum}
            />
          </ListItemButton>
        </Paper>
      </Box>
    </ListItem>
  );
});

const SearchList = ({
  height,
  searchResults,
  onSetPrefixHandler,
  onSetSuffixHandler,
}) => {
  if (searchResults.length > 0) {
    return (
      <FixedSizeList
        height={height}
        width={380}
        itemSize={80}
        itemCount={searchResults.length}
        overscanCount={5}
        itemData={{
          searchResults,
          onSetPrefixHandler,
          onSetSuffixHandler,
        }}
      >
        {renderRow}
      </FixedSizeList>
    );
  }

  return (
    <Box
      sx={{
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Avatar sx={{ width: 180, height: 180 }} alt="logo" src="/search.svg" />
      </Box>
      <Box sx={{ p: '2rem', textAlign: 'center' }}>
        <Typography variant="body1">
          Search for prefix, suffix and course title.
        </Typography>
        <Typography variant="body1">
          Or start indexing by click prefix tab.
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchList;
