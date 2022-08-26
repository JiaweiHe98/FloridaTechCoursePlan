import React, { memo, useContext, useState } from 'react';
import {
  Box,
  Paper,
  Collapse,
  List,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { FixedSizeList } from 'react-window';
import SectionCard from '../courseCard/SectionCard';
import { CartContext } from '../../context/CartContext';
import { timeToString } from '../../../utils/timeHelper';

// const shortDayToLongDay = {
//   M: 'Monday',
//   T: 'Tuesday',
//   W: 'Wednesday',
//   R: 'Thursday',
//   F: 'Friday',
//   S: 'Saturday',
//   U: 'Sunday',
// };

const RenderRow = memo(
  ({
    prefix,
    suffix,
    sectionName,
    sectionDetail,
    onAddCourseToCart,
    onRemoveFromCart,
    isFirst,
  }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <>
        <ListItem component="div" disablePadding>
          <Box
            sx={{
              flexGrow: 1,
              p: '0.5rem',
              pb: 0,
              pt: isFirst ? '4px' : '8px',
            }}
          >
            <Paper variant="outlined">
              <ListItemButton onClick={handleClick}>
                {/* <ListItemText primary={`${data[index].prefix}`} /> */}
                <SectionCard
                  prefix={prefix}
                  suffix={suffix}
                  sectionName={sectionName}
                  sectionDetail={sectionDetail}
                  open={open}
                />
              </ListItemButton>
            </Paper>
          </Box>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box
              sx={{
                m: 'calc(0.5rem + 4px)',
                mt: '1px',
                bgcolor: '#eee',
                borderRadius: '0 0 4px 4px',
                p: '0.5rem',
                zIndex: -100,
              }}
            >
              <Button
                onClick={
                  onAddCourseToCart
                    ? () => {
                        handleClick();
                        setTimeout(() => {
                          onAddCourseToCart({
                            prefix,
                            suffix,
                            sectionName,
                            sectionDetail,
                          });
                        }, 400);
                      }
                    : () => {
                        handleClick();
                        setTimeout(() => {
                          onRemoveFromCart(sectionDetail.crn);
                        }, 400);
                      }
                }
                sx={{ mb: '0.5rem' }}
                variant="contained"
                fullWidth
              >
                {onAddCourseToCart ? 'Add to Cart' : 'Remove from cart'}
              </Button>
              <Divider />
              <Paper
                variant="outlined"
                sx={{
                  mb: '0.5rem',
                  mt: '0.5rem',
                  borderColor: '#1976d2',
                }}
              >
                <Box
                  color="primary"
                  sx={{ p: '0.5rem 1rem 0.5rem 1rem', bgcolor: '#1976d2' }}
                >
                  <Typography
                    sx={{ color: 'white', lineHeight: '1.3em' }}
                    variant="h6"
                  >
                    Course Title
                  </Typography>
                </Box>
                <Box sx={{ p: '0.5rem 1rem 0.5rem 1rem' }}>
                  <Typography variant="body1">{sectionDetail.title}</Typography>
                </Box>
              </Paper>
              <Divider />
              <Paper
                variant="outlined"
                sx={{ mb: '0.5rem', mt: '0.5rem', borderColor: '#1976d2' }}
              >
                <Box sx={{ p: '0.5rem 1rem 0.5rem 1rem', bgcolor: '#1976d2' }}>
                  <Typography
                    sx={{ color: 'white', lineHeight: '1.3em' }}
                    variant="h6"
                  >
                    Course Time and Location
                  </Typography>
                </Box>
                <Box sx={{ p: '0.5rem 1rem 0.5rem 1rem' }}>
                  {sectionDetail.time.length > 0 ? (
                    sectionDetail.time.map((time, index) => {
                      let timeString;
                      try {
                        timeString = timeToString(time);
                      } catch (e) {
                        timeString = 'Not specified';
                      }

                      let place;
                      try {
                        place = time.place;
                      } catch (e) {
                        place = 'Not specified';
                      }

                      return (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{ display: 'inline-block' }}
                              variant="body1"
                            >
                              {time.days ? `${time.days}: ` : ''}
                              {timeString}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>{place}</Typography>
                          </Box>
                        </Box>
                      );
                    })
                  ) : (
                    <Box>
                      <Typography>Time and location not specified!</Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
              <Divider />

              <Paper
                variant="outlined"
                sx={{
                  mb: '0.5rem',
                  mt: '0.5rem',
                  borderColor: '#1976d2',
                }}
              >
                <Box
                  sx={{
                    p: '0.5rem 1rem 0.5rem 1rem',
                    bgcolor: '#1976d2',
                  }}
                >
                  <Typography
                    sx={{ color: 'white', lineHeight: '1.3em' }}
                    variant="h6"
                  >
                    Course Information
                  </Typography>
                </Box>
                <Box sx={{ p: '0.5rem 1rem 0.5rem 1rem' }}>
                  {sectionDetail.info ? (
                    <Typography variant="body1">
                      {sectionDetail.info}
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      No information leaved by the instructor.
                    </Typography>
                  )}
                </Box>
              </Paper>
              <Divider />

              <Paper
                variant="outlined"
                sx={{ mt: '0.5rem', borderColor: '#1976d2' }}
              >
                <Box sx={{ p: '0.5rem 1rem 0.5rem 1rem', bgcolor: '#1976d2' }}>
                  <Typography
                    sx={{ color: 'white', lineHeight: '1.3em' }}
                    variant="h6"
                  >
                    Course Notes
                  </Typography>
                </Box>
                <Box sx={{ p: '0.5rem 1rem 0.5rem 1rem' }}>
                  {sectionDetail.notes ? (
                    <Typography variant="">{sectionDetail.notes}</Typography>
                  ) : (
                    <Typography variant="body1">
                      No notes leaved by the instructor.
                    </Typography>
                  )}
                </Box>
              </Paper>

              {/* <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Starred" />
            </ListItemButton> */}
            </Box>
          </List>
        </Collapse>
      </>
    );
  }
);

const SectionListReal = ({
  height,
  prefix,
  suffix,
  sectionsArray,
  onAddCourseToCart,
}) => {
  const [cart] = useContext(CartContext);
  let isFirst = true;
  let isFirst2 = false;

  return (
    <Box
      className="none-scroll-list"
      sx={{ height: height, overflow: 'scroll' }}
    >
      {sectionsArray.map((_data, index) => {
        const sectionName = sectionsArray[index][0];
        const sectionDetail = sectionsArray[index][1];
        if (
          cart.find((course) => course.sectionDetail.crn === sectionDetail.crn)
        ) {
          return null;
        }

        if (isFirst) {
          isFirst = false;
          isFirst2 = true;
        } else {
          isFirst2 = false;
        }

        return (
          <RenderRow
            key={index}
            prefix={prefix}
            suffix={suffix}
            sectionName={sectionName}
            sectionDetail={sectionDetail}
            onAddCourseToCart={onAddCourseToCart}
            onRemoveFromCart={null}
            isFirst={isFirst2}
          />
        );
      })}
    </Box>
  );
};

export { SectionListReal, RenderRow };
