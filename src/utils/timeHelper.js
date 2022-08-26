// use to convert to string
const extractTimeToString = (time) => {
  const startHour = time.start[0] >= 10 ? time.start[0] : '0' + time.start[0];
  const startMin = time.start[1] >= 10 ? time.start[1] : '0' + time.start[1];

  const endHour = time.end[0] >= 10 ? time.end[0] : '0' + time.end[0];
  const endMin = time.end[1] >= 10 ? time.end[1] : '0' + time.end[1];

  return [startHour, startMin, endHour, endMin];
};

// extract time only
const extractTime = (time) => {
  const startHour = time.start[0];
  const startMin = time.start[1];

  const endHour = time.end[0];
  const endMin = time.end[1];

  return [startHour, startMin, endHour, endMin];
};

// does not include day
export const timeToString = (time) => {
  const [startHour, startMin, endHour, endMin] = extractTimeToString(time);
  return `${startHour}:${startMin} - ${endHour}:${endMin}`;
};

export const calDurationMin = (time) => {
  const [startHour, startMin, endHour, endMin] = extractTime(time);
  return (endHour - startHour) * 60 + (endMin - startMin);
};

export const calDurationMinStartEnd = (startArr, endArr) => {
  const startHour = startArr[0];
  const startMin = startArr[1];

  const endHour = endArr[0];
  const endMin = endArr[1];

  return (endHour - startHour) * 60 + (endMin - startMin);
};

export const calcTopAndHeight = (start, end, startTimeArr, endTimeArr) => {
  const minsTotal = calDurationMinStartEnd(startTimeArr, endTimeArr);
  const minCourse = end - start;

  const top = start / minsTotal;

  const height = minCourse / minsTotal;

  return [top, height];
};

const timeToMin = (timeArr) => {
  return timeArr[0] * 60 + timeArr[1];
};

export const checkTimeConflict = (time1, time2) => {
  const start1 = timeToMin(time1.start);
  const start2 = timeToMin(time2.start);
  const end1 = timeToMin(time1.end);
  const end2 = timeToMin(time2.end);

  if (start1 < end2) {
    if (start2 < end1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
