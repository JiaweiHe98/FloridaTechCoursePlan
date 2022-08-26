// support prefix, suffix, and title search
// jump to sections when click
// to find prefix suffix cr title sectionNum

import { processCrAndTitle } from './processCourse';

const courseIndex = {
  fall: [],
  spring: [],
  summer: [],
};

export const generateIndex = (courseList) => {
  for (const semester of ['fall', 'spring', 'summer']) {
    const currentCourseIndex = [];

    for (const prefix in courseList[semester]) {
      const currentCourseList = courseList[semester];
      const courses = currentCourseList[prefix];

      for (const suffix in courses) {
        const sections = courses[suffix].sections;
        const [minCr, maxCr, curMaxTitle] = processCrAndTitle(sections);

        currentCourseIndex.push({
          forSearch: `${prefix.toLowerCase()} ${suffix.toLowerCase()} ${curMaxTitle.toLowerCase()}`,
          prefix,
          suffix,
          curMaxTitle,
          minCr,
          maxCr,
          sectionNum: Object.keys(sections).length,
        });
      }
    }

    courseIndex[semester] = currentCourseIndex;
  }
};

export const search = (userInput, semester) => {
  if (!userInput) {
    return [];
  }

  if (courseIndex.length === 0) {
    return [];
  }

  const output = [];

  courseIndex[semester].forEach((course) => {
    if (course.forSearch.includes(userInput)) {
      output.push({
        prefix: course.prefix,
        suffix: course.suffix,
        cr: [course.minCr, course.maxCr],
        title: course.curMaxTitle,
        sectionNum: course.sectionNum,
      });
    }
  });

  output.sort((a, b) => {
    if (a.prefix.attr - b.prefix.attr === 0) {
      if (+a.suffix - +b.suffix < 0) {
        return -1;
      } else {
        return 1;
      }
    } else if (a.prefix.attr - b.prefix.attr < 0) {
      return -1;
    } else {
      return 1;
    }
  });

  return output;
};
