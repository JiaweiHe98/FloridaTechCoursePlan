import { Select, MenuItem, FormControl } from '@mui/material';

const CartSelector = () => {
  return (
    <FormControl sx={{ width: 100 }}>
      {/* <InputLabel>Semester</InputLabel> */}
      <Select
        variant="standard"
        size="small"
        labelId="semester label"
        id="semester-select"
        // value={semester}
        label="Semester"
        // onChange={handleChange}
      >
        <MenuItem value={'primary'}>Primary</MenuItem>
        <MenuItem value={'spring'}>Spring</MenuItem>
        <MenuItem value={'summer'}>Summer</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CartSelector;
