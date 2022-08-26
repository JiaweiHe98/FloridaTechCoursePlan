import React, { memo } from 'react';
import { Box, Paper } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import PrefixCard from '../courseCard/PrefixCard';

const renderRow = memo(({ index, style, data }) => {
  const [prefixAndCourseNum, onSetPrefixHandler] = data;
  const prefix = prefixAndCourseNum[index].prefix;
  const courseNum = prefixAndCourseNum[index].courseNum;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <Box sx={{ flexGrow: 1, p: '0.5rem', pt: '4px', pb: '4px' }}>
        <Paper variant="outlined">
          <ListItemButton onClick={() => onSetPrefixHandler(prefix)}>
            <PrefixCard prefix={prefix} courseNum={courseNum} />
          </ListItemButton>
        </Paper>
      </Box>
    </ListItem>
  );
});

export default function PrefixList({
  height,
  prefixAndCourseNums,
  onSetPrefixHandler,
}) {
  return (
    <FixedSizeList
      className="none-scroll-list"
      height={height}
      width={380}
      itemSize={80}
      itemCount={prefixAndCourseNums.length}
      overscanCount={5}
      itemData={[prefixAndCourseNums, onSetPrefixHandler]}
    >
      {renderRow}
    </FixedSizeList>
  );
}
