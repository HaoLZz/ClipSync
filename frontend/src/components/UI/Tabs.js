import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Tabs({ children, tabLabels }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const tabListStyle = matches ? { center: true } : { variant: 'fullWidth' };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs for switching app views"
            {...tabListStyle}
          >
            {tabLabels.map((label, i) => (
              <Tab label={label} value={String(i + 1)} key={label} />
            ))}
          </TabList>
        </Box>
        {React.Children.map(children, (child, i) => (
          <TabPanel value={String(i + 1)}>{child}</TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
