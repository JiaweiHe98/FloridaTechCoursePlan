import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ stage, setStage, prefix, suffix }) {
  const handleChange = (event, newStage) => {
    setStage(newStage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          id="tabs"
          variant="fullWidth"
          value={stage}
          onChange={handleChange}
        >
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Prefix" {...a11yProps(0)} />
          <Tab
            disabled={prefix ? false : true}
            label="Suffix"
            {...a11yProps(1)}
          />
          <Tab
            disabled={suffix ? false : true}
            label="Section"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
