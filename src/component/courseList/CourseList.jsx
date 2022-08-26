import React, { useEffect, useContext, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import TabPanel from './TabPanel';
// import SwipeableViews from 'react-swipeable-views';
// import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { CurrentCourseListContext } from '../context/CurrentCourseListContext';
import PrefixList from './virtualizedList/PrefixList';
import SuffixList from './virtualizedList/SuffixList';
import { CartContext } from '../context/CartContext';
import { SectionListReal } from './virtualizedList/SectionList';
import { DimensionContext } from '../context/DimensionContext';
import SearchList from './virtualizedList/SearchList';
import { processCourse } from '../../utils/processCourse';

// const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

// const RnderPrefixList = ({
//   dimensions,
//   headerHeight,
//   tabHeight,
//   currentCourseList,
//   onSetPrefixHandler,
// }) => {
//   if (!currentCourseList) {
//     return;
//   }

//   const listHeight = dimensions.height - headerHeight - tabHeight;
//   // console.log(headerHeight, tabHeight);

//   const prefixAndCourseNums = [];
//   for (const prefix in currentCourseList) {
//     prefixAndCourseNums.push({
//       prefix,
//       courseNum: Object.keys(currentCourseList[prefix]).length,
//     });
//   }

//   return (
//     <PrefixList
//       height={listHeight}
//       prefixAndCourseNums={prefixAndCourseNums}
//       onSetPrefixHandler={onSetPrefixHandler}
//     />
//   );
// };

// const RenderSuffixList = ({
//   dimensions,
//   headerHeight,
//   tabHeight,
//   currentCourseList,
//   prefix,
//   onSetSuffixHandler,
// }) => {
//   if (!currentCourseList || !prefix) {
//     return;
//   }

//   const listHeight = dimensions.height - headerHeight - tabHeight;
//   // console.log(headerHeight, tabHeight);
//   const suffixCrTitleAndSectionNums = [];
//   for (const suffix in currentCourseList[prefix]) {
//     const titleFrequency = {};
//     let curMax = 0;

//     let minCr = 19;
//     let maxCr = 0;

//     const sections = currentCourseList[prefix][suffix].sections;
//     let curMaxTitle = sections[Object.keys(sections)[0]].title;
//     for (const sectionName in sections) {
//       const title = sections[sectionName].title;
//       const cr = sections[sectionName].cr;
//       minCr = Math.min(cr[0], minCr);
//       maxCr = Math.max(cr[1], maxCr);

//       if (titleFrequency[title]) {
//         titleFrequency[title]++;

//         if (titleFrequency[title] > curMax) {
//           curMax = titleFrequency[title];
//           curMaxTitle = title;
//         }
//       } else {
//         titleFrequency[title] = 1;
//       }
//     }

//     suffixCrTitleAndSectionNums.push({
//       suffix,
//       cr: [minCr, maxCr],
//       title: curMaxTitle,
//       sectionNum: Object.keys(sections).length,
//     });
//   }

//   return (
//     <SuffixList
//       height={listHeight}
//       prefix={prefix}
//       suffixCrTitleAndSectionNums={suffixCrTitleAndSectionNums}
//       onSetSuffixHandler={onSetSuffixHandler}
//     />
//   );
// };

// const RenderSectionList = ({
//   dimensions,
//   headerHeight,
//   tabHeight,
//   currentCourseList,
//   prefix,
//   suffix,
//   onAddCourseToCart,
// }) => {
//   if (!currentCourseList || !prefix || !suffix) {
//     return;
//   }

//   console.log(prefix, suffix);

//   const listHeight = dimensions.height - headerHeight - tabHeight;
//   // console.log(headerHeight, tabHeight);

//   const sections = currentCourseList[prefix][suffix].sections;
//   const sectionsArray = [];
//   for (const sectionName in sections) {
//     sectionsArray.push([sectionName, sections[sectionName]]);
//   }
//   return (
//     <SectionList
//       height={listHeight}
//       prefix={prefix}
//       suffix={suffix}
//       sectionsArray={sectionsArray}
//       onAddCourseToCart={onAddCourseToCart}
//     />
//   );
// };

const CourseList = ({ headerHeight, searchResults }) => {
  // cross 3 sections
  const [stage, setStage] = useState(1);
  const [cart, setCart] = useContext(CartContext);
  const dimensions = useContext(DimensionContext);
  const [tabHeight, setTabHeight] = useState(0);
  const tabRef = useRef();

  useEffect(() => {
    if (tabRef) {
      setTabHeight(tabRef.current.offsetHeight);
    }
  }, [dimensions]);

  // 1 and 2
  const [currentCourseList] = useContext(CurrentCourseListContext);

  // 1
  const [prefix, setPrefix] = useState(null);
  const [suffix, setSuffix] = useState(null);
  const listSectionBoxRef = useRef(null);

  useEffect(() => {
    setStage(0);
  }, [searchResults]);

  const onAddCourseToCart = (course) => {
    setCart([course, ...cart]);
  };

  const onSetPrefixHandler = (prefix) => {
    setPrefix(prefix);
    setSuffix(null);
    setStage(2);
  };

  const onSetPrefixHandlerBySearch = (prefix) => {
    setPrefix(prefix);
  };

  const onSetSuffixHandler = (suffix) => {
    setSuffix(suffix);
    setStage(3);
  };

  const renderSearchList = () => {
    if (!currentCourseList) {
      return;
    }

    const listHeight = dimensions.height - headerHeight - tabHeight;

    return (
      <SearchList
        height={listHeight}
        searchResults={searchResults}
        onSetPrefixHandler={onSetPrefixHandlerBySearch}
        onSetSuffixHandler={onSetSuffixHandler}
      />
    );
  };

  const renderPrefixList = () => {
    if (!currentCourseList) {
      return;
    }

    const listHeight = dimensions.height - headerHeight - tabHeight;

    const prefixAndCourseNums = [];
    for (const prefix in currentCourseList) {
      prefixAndCourseNums.push({
        prefix,
        courseNum: Object.keys(currentCourseList[prefix]).length,
      });
    }

    return (
      <PrefixList
        height={listHeight}
        prefixAndCourseNums={prefixAndCourseNums}
        onSetPrefixHandler={onSetPrefixHandler}
      />
    );
  };

  const renderSuffixList = () => {
    if (!currentCourseList || !prefix) {
      return;
    }

    const listHeight = dimensions.height - headerHeight - tabHeight;
    // console.log(headerHeight, tabHeight);
    const suffixCrTitleAndSectionNums = processCourse(
      prefix,
      currentCourseList
    );

    return (
      <SuffixList
        height={listHeight}
        className="none-scroll-list"
        prefix={prefix}
        suffixCrTitleAndSectionNums={suffixCrTitleAndSectionNums}
        onSetSuffixHandler={onSetSuffixHandler}
      />
    );
  };

  const renderSectionList = () => {
    if (!currentCourseList || !prefix || !suffix) {
      return;
    }

    const listHeight = dimensions.height - headerHeight - tabHeight;
    // console.log(headerHeight, tabHeight);

    const sections = currentCourseList[prefix][suffix].sections;
    const sectionsArray = [];
    for (const sectionName in sections) {
      sectionsArray.push([sectionName, sections[sectionName]]);
    }
    return (
      <SectionListReal
        height={listHeight}
        prefix={prefix}
        suffix={suffix}
        sectionsArray={sectionsArray}
        onAddCourseToCart={onAddCourseToCart}
      />
    );
  };

  return (
    <>
      <Box ref={tabRef}>
        <TabPanel
          stage={stage}
          setStage={setStage}
          prefix={prefix}
          suffix={suffix}
        />
      </Box>
      <Paper
        square
        ref={listSectionBoxRef}
        className="search-section-list-box"
        sx={{
          flexGrow: 1,
          width: 380,
        }}
      >
        {stage === 0 && renderSearchList()}
        {stage === 1 && renderPrefixList()}
        {stage === 2 && renderSuffixList()}
        {stage === 3 && renderSectionList()}
      </Paper>
    </>
  );
};

export default CourseList;
