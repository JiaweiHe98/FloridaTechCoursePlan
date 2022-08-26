import React, { memo } from 'react';
import { Box, Paper } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import SuffixCard from '../courseCard/SuffixCard';

const renderRow = memo(({ index, style, data }) => {
  const [prefix, suffixTitleAndSectionNums, onSetSuffixHandler] = data;
  const suffix = suffixTitleAndSectionNums[index].suffix;
  const sectionNum = suffixTitleAndSectionNums[index].sectionNum;
  const cr = suffixTitleAndSectionNums[index].cr;
  const title = suffixTitleAndSectionNums[index].title;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <Box sx={{ flexGrow: 1, p: '0.5rem', pt: '4px', pb: '4px' }}>
        <Paper variant="outlined">
          <ListItemButton onClick={() => onSetSuffixHandler(suffix)}>
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

export default function SuffixList({
  height,
  prefix,
  suffixCrTitleAndSectionNums,
  onSetSuffixHandler,
}) {
  return (
    <FixedSizeList
      className="none-scroll-list"
      height={height}
      width={380}
      itemSize={80}
      itemCount={suffixCrTitleAndSectionNums.length}
      overscanCount={5}
      itemData={[prefix, suffixCrTitleAndSectionNums, onSetSuffixHandler]}
    >
      {renderRow}
    </FixedSizeList>
  );
}

export { renderRow };
