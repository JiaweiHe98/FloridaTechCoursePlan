import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Button,
  TextField,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SemesterSelector from './SemesterSelector';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ setUserSearchInput, setOpenAbout }) => {
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setUserSearchInput(userInput);
    }, 500);
    // console.log(`set ${timeOut}`);
    return () => {
      // console.log(`remove ${timeOut}`);
      clearTimeout(timeOut);
    };
  }, [setUserSearchInput, userInput]);

  return (
    <>
      <Paper variant="outlined" square>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ml: '0.5rem' }}>
            <IconButton
              onClick={() => {
                setOpenAbout(true);
              }}
              sx={{ width: 60, height: 60 }}
            >
              <Avatar
                sx={{ m: 0, width: 55, height: 55 }}
                alt="logo"
                src="/calendar.svg"
              />
            </IconButton>
          </Box>
          <Box sx={{ m: '1rem', width: 500 }}>
            <TextField
              size="small"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              id="course-search"
              fullWidth
              label="Search"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mr: '1rem' }}>
            <SemesterSelector />
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ mr: '1rem' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenAbout(true);
              }}
            >
              About
            </Button>
          </Box>
          <Box sx={{ mr: '1rem' }}>
            <Button
              variant="outlined"
              onClick={() => {
                //url: https://airtable.com/shrRYNqm5dllbKvpK
                window.location.href = 'https://airtable.com/shrRYNqm5dllbKvpK';
              }}
            >
              Feedback
            </Button>
          </Box>
          <Box sx={{ mr: '1rem' }}>
            <Button
              variant="outlined"
              onClick={() => {
                //url: https://airtable.com/shrRYNqm5dllbKvpK
                window.location.href =
                  'https://github.com/JiaweiHe98/FloridaTechCoursePlan';
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Header;
