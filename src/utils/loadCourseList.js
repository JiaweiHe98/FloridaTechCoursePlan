import axios from 'axios';

const loadCourseList = async () => {
  try {
    const res = await axios.get('/courseList.json');
    const result = {};
    result.courseList = res.data;
    result.message = 'ok';
    return result;
  } catch (e) {
    const result = {};
    result.courseList = null;
    result.message = e.message;
    return result;
  }
};

export default loadCourseList;
