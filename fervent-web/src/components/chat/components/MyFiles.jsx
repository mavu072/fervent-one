import React from 'react';
import firebase from 'firebase/compat/app';
import Paper from '@mui/material/Paper';
import FileService from '../../../service/FileService';
import FilesPane from './FilesPane';

/**
 * MyFiles.
 * @param {object} props 
 * @param {firebase.User} props.user
 * @param {FileService} props.fileService
 * @returns JSX component
 */
function MyFiles({}) {
  return (
    <Paper
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: 'var(--Header-height)',
        borderRadius: '0',
      }}
    >
      <FilesPane />
    </Paper>
  );
}

export default MyFiles;