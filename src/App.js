import { Box, Divider, Paper, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import { CartContext } from './component/context/CartContext';
import { SemesterContext } from './component/context/SemesterContext';
import { CurrentCourseListContext } from './component/context/CurrentCourseListContext';
import { DimensionContext } from './component/context/DimensionContext';
import { PrefixMapContext } from './component/context/PrefixMapContext';
import CourseList from './component/courseList/CourseList';
import Header from './component/header/Header';
import loadCourseList from './utils/loadCourseList';
import loadPrefixMap from './utils/loadPrefixMap';
import CartList from './component/cart/CartList';
import debounce from './utils/debounce';
import { generateIndex, search } from './utils/search';
import { TimeTable } from './component/scheduler/TimeTable';
import BasicModal from './component/modal/BasicModal';
import { read, store } from './utils/localStorageHelper';

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [coursePrefixMap, setCoursePrefixMap] = useState({});
  const [courseList, setCourseList] = useState({});
  const [currentCourseList, setCurrentCourseList] = useState({});
  const [semester, setSemester] = useState('fall');
  // put whole course information in the cart

  const [openAbout, setOpenAbout] = useState(false);

  const [cart, setCart] = useState(read());
  const [userSearchInput, setUserSearchInput] = useState('');
  const [userSearchResult, setUserSearchResult] = useState([]);

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef();

  useEffect(() => {
    store(cart);
  }, [cart]);

  useEffect(() => {
    setUserSearchResult(search(userSearchInput, semester));
  }, [userSearchInput, semester]);

  useEffect(() => {
    if (headerRef) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [dimensions]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      if (window.innerHeight >= 450 && window.innerWidth >= 800) {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      } else {
        setDimensions({
          height: 450,
          width: 800,
        });
      }
    }, 10);

    // console.log(dimensions);
    window.addEventListener('resize', debouncedHandleResize);

    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  useEffect(() => {
    const load = async () => {
      const result = await loadCourseList();

      if (result.message === 'ok') {
        setCourseList(result.courseList);
        generateIndex(result.courseList);
      } else {
        console.log(result.message);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      const result = await loadPrefixMap();

      if (result.message === 'ok') {
        setCoursePrefixMap(result.prefixMap);
      } else {
        console.log(result.message);
      }
    };

    load();
  }, []);

  useEffect(() => {
    setCurrentCourseList(courseList[semester]);
  }, [semester, courseList]);

  return (
    <div className="App">
      <BasicModal
        open={openAbout}
        handleClose={() => setOpenAbout(false)}
        title={'Welcome to Florida Tech Course Plan'}
        message={
          "Hi! 👋 I'm Jiawei He, the developer of the app. If you have\
           any questions or comment, please hit the 'FEEDBACK' button on the top right.\
            Thanks the developers of Material UI and React for making this project possible!"
        }
      />
      <Box
        className="app"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '800px',
          minHeight: '450px',
          maxHeight: '100vh',
          maxWidth: '100vw',
        }}
      >
        {/* All the sub-components here */}
        <SemesterContext.Provider value={[semester, setSemester]}>
          {/* this box is holdring the header */}
          <Box ref={headerRef}>
            <Header
              setUserSearchInput={setUserSearchInput}
              setOpenAbout={setOpenAbout}
            />
          </Box>
          <CurrentCourseListContext.Provider value={[currentCourseList, null]}>
            <CartContext.Provider value={[cart, setCart]}>
              <DimensionContext.Provider value={dimensions}>
                <PrefixMapContext.Provider value={coursePrefixMap}>
                  <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Box
                      sx={{
                        width: 380,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CourseList
                        headerHeight={headerHeight}
                        searchResults={userSearchResult}
                      />
                    </Box>

                    <Paper
                      square
                      sx={{
                        width: 380,
                        minWidth: 380,
                        height: dimensions.height - headerHeight,
                      }}
                    >
                      <CartList headerHeight={headerHeight} />
                    </Paper>
                    <Paper square sx={{ width: 'calc(100vw - 350px - 380px)' }}>
                      <TimeTable
                        headerHeight={headerHeight}
                        rows={21}
                        cols={5}
                      />
                    </Paper>
                  </Box>
                </PrefixMapContext.Provider>
              </DimensionContext.Provider>
            </CartContext.Provider>
          </CurrentCourseListContext.Provider>
        </SemesterContext.Provider>
      </Box>
    </div>
  );
}

export default App;
