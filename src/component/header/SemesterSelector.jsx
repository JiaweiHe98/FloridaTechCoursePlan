import React, { useContext } from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { SemesterContext } from '../context/SemesterContext';

const SemesterSelector = () => {
  const [semester, setSemester] = useContext(SemesterContext);

  const handleChange = (e) => {
    setSemester(e.target.value);
  };

  return (
    <FormControl sx={{ width: 100 }}>
      <InputLabel>Semester</InputLabel>
      <Select
        size="small"
        labelId="semester label"
        id="semester-select"
        value={semester}
        label="Semester"
        onChange={handleChange}
      >
        <MenuItem value={'fall'}>Fall</MenuItem>
        <MenuItem value={'spring'}>Spring</MenuItem>
        <MenuItem value={'summer'}>Summer</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SemesterSelector;
