import {
  calcTopAndHeight,
  timeToString,
  calDurationMinStartEnd,
} from './timeHelper';

const dayIndex = {
  M: 0,
  T: 1,
  W: 2,
  R: 3,
  F: 4,
  S: 5,
  U: 6,
};

export const generateDaysArray = (cart, colorMap, totalStart) => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push([]);
  }

  for (const course of cart) {
    for (const time of course.sectionDetail.time) {
      if (!time.days) {
        break;
      }

      for (const day of time.days) {
        const dayIdx = dayIndex[day];
        days[dayIdx].push({
          prefix: course.prefix,
          suffix: course.suffix,
          sectionName: course.sectionName,
          color: colorMap[course.prefix],
          start: calDurationMinStartEnd(totalStart, time.start),
          end: calDurationMinStartEnd(totalStart, time.end),
          timeString: timeToString(time),
        });
      }
    }
  }

  return days;
};

// for one day
export const generateTracksArray = (totalMin, dayArray) => {
  const tracks = [new Array(totalMin).fill(-1)];

  for (let index = 0; index < dayArray.length; index++) {
    const timeSlot = dayArray[index];
    let pt = 0;

    while (true) {
      // new track
      if (pt >= tracks.length) {
        tracks.push(new Array(totalMin).fill(-1));
        for (let i = timeSlot.start; i < timeSlot.end; i++) {
          tracks[pt][i] = index;
        }
        break;
      }

      let ableToPut = true;

      // check track available
      for (let i = timeSlot.start; i < timeSlot.end; i++) {
        if (tracks[pt][i] !== -1) {
          ableToPut = false;
          break;
        }
      }

      // put in existing track
      if (ableToPut) {
        for (let i = timeSlot.start; i < timeSlot.end; i++) {
          tracks[pt][i] = index;
        }
        break;
      }

      pt++;
    }
  }

  return tracks;
};

export const tracksToLocs = (tracks, dayArray, totalStart, totalEnd) => {
  const cols = tracks.length;
  const locs = [];

  for (let index = 0; index < dayArray.length; index++) {
    const timeSlot = dayArray[index];
    const startMin = timeSlot.start;
    const endMin = timeSlot.end;

    let ithCol = 0;
    while (ithCol < cols) {
      if (tracks[ithCol][startMin] === index) {
        break;
      }

      ithCol++;
    }
    // console.log(tracks[0][startMin]);

    // console.log(ithCol);

    // ithCol is the start col
    const startCol = ithCol;
    ithCol++;

    // check remaining
    while (ithCol < cols) {
      let available = true;
      for (let i = startMin; i < endMin; i++) {
        if (tracks[ithCol][i] !== -1) {
          available = false;
          break;
        }
      }

      if (available) {
        ithCol++;
      } else {
        break;
      }
    }

    const endCol = ithCol;

    const [top, height] = calcTopAndHeight(
      startMin,
      endMin,
      totalStart,
      totalEnd
    );
    const left = startCol / cols;
    const width = (endCol - startCol) / cols;

    locs.push({
      top,
      left,
      height,
      width,
      prefix: timeSlot.prefix,
      suffix: timeSlot.suffix,
      sectionName: timeSlot.sectionName,
      timeString: timeSlot.timeString,
      color: timeSlot.color,
    });
  }

  return locs;
};
