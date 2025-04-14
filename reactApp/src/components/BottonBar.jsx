import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';


const BottomBar = () => {
    const theme = useTheme();
  return (
    <Box
      height="150px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor={theme.palette.primary[500]}
      backgroundColor={theme.palette.primary[500]}
    >
    
    </Box>
  );
};
export default BottomBar;