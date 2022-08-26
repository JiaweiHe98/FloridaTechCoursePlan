export const processCourse = (prefix, currentCourseList) => {
  const suffixCrTitleAndSectionNums = [];
  for (const suffix in currentCourseList[prefix]) {
    const sections = currentCourseList[prefix][suffix].sections;
    const [minCr, maxCr, curMaxTitle] = processCrAndTitle(sections);

    suffixCrTitleAndSectionNums.push({
      suffix,
      cr: [minCr, maxCr],
      title: curMaxTitle,
      sectionNum: Object.keys(sections).length,
    });
  }

  return suffixCrTitleAndSectionNums;
};

export const processCrAndTitle = (sections) => {
  const titleFrequency = {};
  let curMax = 0;
  let curMaxTitle = sections[Object.keys(sections)[0]].title;

  let minCr = 19;
  let maxCr = 0;
  for (const sectionName in sections) {
    const title = sections[sectionName].title;
    const cr = sections[sectionName].cr;
    minCr = Math.min(cr[0], minCr);
    maxCr = Math.max(cr[1], maxCr);

    if (titleFrequency[title]) {
      titleFrequency[title]++;

      if (titleFrequency[title] > curMax) {
        curMax = titleFrequency[title];
        curMaxTitle = title;
      }
    } else {
      titleFrequency[title] = 1;
    }
  }

  return [minCr, maxCr, curMaxTitle];
};
