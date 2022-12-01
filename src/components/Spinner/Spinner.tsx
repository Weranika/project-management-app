import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <CircularProgress
        color="secondary"
        sx={{ width: '2.5rem', height: '2.5rem' }}
      />
    </Box>
  );
}
