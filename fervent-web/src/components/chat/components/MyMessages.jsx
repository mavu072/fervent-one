import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import MessagesPane from './MessagesPane';

/**
 * MyMessages.
 * @returns JSX component
 */
function MyMessages() {
  return (
    <Paper
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: 'var(--Header-height)',
        borderRadius: 0,
      }}
    >
      <MessagesPane />
    </Paper>
  );
}

export default MyMessages;