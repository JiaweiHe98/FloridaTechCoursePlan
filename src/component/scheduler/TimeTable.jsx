import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
  TableHead,
} from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { DimensionContext } from '../context/DimensionContext';
import TimeCard from './TimeCard';
import { calDurationMinStartEnd } from '../../utils/timeHelper';
import { PrefixMapContext } from '../context/PrefixMapContext';
import {
  generateDaysArray,
  generateTracksArray,
  tracksToLocs,
} from '../../utils/schedulerHelper';

const shortDayToLongDay = {
  M: 'Monday',
  T: 'Tuesday',
  W: 'Wednesday',
  R: 'Thursday',
  F: 'Friday',
  S: 'Saturday',
  U: 'Sunday',
};

const time = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

const startArr = [8, 0];
const endArr = [18, 30];
const totalMin = calDurationMinStartEnd(startArr, endArr);

export const TimeTable = ({ headerHeight, rows, cols }) => {
  const dimensions = useContext(DimensionContext);

  const [cart] = useContext(CartContext);
  const colorMap = useContext(PrefixMapContext);

  // const [tableOffset, setTableOffset] = useState({});
  // const tableRef = useRef();

  // useEffect(() => {
  //   if (tableRef) {
  //     setTableOffset({
  //       top: tableRef.current.offsetTop,
  //       left: tableRef.current.offsetLeft,
  //     });
  //   }
  // }, [dimensions]);

  const [tbodyDimension, setTbodyDimension] = useState({});
  const tbodyRef = useRef();

  useEffect(() => {
    if (tbodyRef) {
      // console.log(tbodyDimension);
      setTbodyDimension({
        height: tbodyRef.current.offsetHeight,
        width: tbodyRef.current.offsetWidth,
        top: tbodyRef.current.offsetTop,
        left: tbodyRef.current.offsetLeft,
      });
    }
  }, [dimensions]);

  const renderRows = () => {
    return (
      <>
        {[...Array(rows).keys()].map((index) => (
          <TableRow key={index}>{renderCells(index)}</TableRow>
        ))}
      </>
    );
  };

  const renderCells = (row) => {
    return (
      <>
        <TableCell
          sx={{
            pt: 0,
            borderRight: '1px solid rgba(224, 224, 224, 1)',
            width: '6%',
          }}
        >
          {time[row]}
        </TableCell>
        {[...Array(cols).keys()].map((index) => {
          // if (index === 0 && row === 0) {
          //   return (
          //     <TableCell sx={{ p: 0, borderBottom: 'none' }} key={index} />
          //   );
          // }

          return (
            <TableCell
              sx={{
                p: 0,
                borderRight: '1px solid rgba(224, 224, 224, 1)',
                '&:hover': {
                  bgcolor: '#eee',
                },
              }}
              key={index}
            />
          );
        })}
      </>
    );
  };

  const renderDays = () => {
    return (
      <>
        <TableCell sx={{ width: '6%' }} />
        {[...Array(cols).keys()].map((index) => (
          <TableCell sx={{ width: `${94 / cols}%` }} key={index}>
            {shortDayToLongDay[Object.keys(shortDayToLongDay)[index]]}
          </TableCell>
        ))}
      </>
    );
  };

  const renderCols = (cards) => {
    // console.log(cards);

    return (
      <>
        <Box
          sx={{ position: 'relative', width: '6%', minWidth: '67.59px' }}
        ></Box>
        {[...Array(cols).keys()].map((index) => (
          <Box key={index} sx={{ position: 'relative', flexGrow: 1 }}>
            {cards[index]}
          </Box>
        ))}
      </>
    );
  };

  const renderCourseStickers = () => {
    if (Object.keys(colorMap).length === 0) {
      return;
    }

    let locs = [];

    const days = generateDaysArray(cart, colorMap, startArr);

    for (const dayArr of days) {
      const tracks = generateTracksArray(totalMin, dayArr);
      locs.push(tracksToLocs(tracks, dayArr, startArr, endArr));
    }

    locs = locs.slice(0, 5);

    // console.log(locs);

    // const loc = {
    //   height: '100px',
    //   left: 0,
    //   top: `${0.5 * tbodyDimension.height}px`,
    //   width: '50%',
    // };

    // return (
    //   <TimeCard
    //     prefix={'AEE'}
    //     suffix={'3041'}
    //     sectionName={'01'}
    //     timeString={'12:00-13:00'}
    //     loc={loc}
    //   >
    //     hey
    //   </TimeCard>
    // );

    const cards = [];

    for (const locDay of locs) {
      cards.push(
        locDay.map((loc, idx) => {
          return (
            <TimeCard
              key={idx}
              prefix={loc.prefix}
              suffix={loc.suffix}
              sectionName={loc.sectionName}
              timeString={loc.timeString}
              bgcolor={loc.color}
              loc={{
                top: loc.top * tbodyDimension.height,
                left: loc.left * 100,
                height: loc.height * tbodyDimension.height,
                width: loc.width * 100,
              }}
            />
          );
        })
      );
    }

    return cards;
  };
  //   return (
  //     {}
  //     <TimeCard
  //       prefix={'AEE'}
  //       suffix={'3041'}
  //       sectionName={'01'}
  //       timeString={'12:00-13:00'}
  //       loc={loc}
  //     >
  //       hey
  //     </TimeCard>
  //   );
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: dimensions.height - headerHeight,
        maxHeight: dimensions.height - headerHeight,
      }}
    >
      <Box
        sx={{
          height: 48,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          pl: '1rem',
          pr: '1rem',
        }}
      >
        <Typography variant="h6">Schedule</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          maxHeight: 'calc(100% - 49px)',
        }}
      >
        <TableContainer
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          component={Box}
        >
          <Table stickyHeader sx={{ height: '100%' }}>
            <TableHead>
              <TableRow>{renderDays()}</TableRow>
            </TableHead>

            <TableBody
              ref={tbodyRef}
              sx={{ position: 'relative', width: '100%' }}
            >
              <TableRow
                sx={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  top: 0,
                  left: 0,
                }}
              >
                <TableCell
                  sx={{
                    borderBottom: 'none',
                    p: 0,
                    m: 0,
                    width: '100%',
                  }}
                >
                  <Box sx={{ width: '100%', display: 'flex' }}>
                    {Object.keys(colorMap).length > 0 &&
                      renderCols(renderCourseStickers())}
                  </Box>
                </TableCell>
              </TableRow>
              {renderRows()}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
