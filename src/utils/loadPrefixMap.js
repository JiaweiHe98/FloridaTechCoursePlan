const axios = require('axios');

const loadPrefixMap = async () => {
  try {
    const res = await axios.get('/coursePrefix.json');
    const result = {};
    result.prefixMap = res.data;
    result.message = 'ok';
    return result;
  } catch (e) {
    const result = {};
    result.prefixMap = null;
    result.message = e.message;
    return result;
  }
};

export default loadPrefixMap;
