import React from "react";
import Stack from '@mui/material/Stack';
import FileItem from './FileItem';
import { scrollbarStyle } from '../../ui/scrollbarUtil';

/**
 * FileItemList.
 * @param {object} props
 * @param {Array<File>} props.fileList Stored state of the files.
 * @param {Function} props.onRemoveFile
 * @returns JSX Component
 */
function FileItemList({ fileList, onRemoveFile }) {
    return (
        <Stack
            gap={1}
            sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'row',
                width: '100%',
                mb: 1,
                ...scrollbarStyle,
                overflowY: 'hidden',
            }}
        >
            {fileList && fileList.map((file, index) => (
                <FileItem 
                key={index} 
                fileId={index}
                file={file} 
                onRemoveFile={onRemoveFile}
                />
            ))}
        </Stack>
    );
}

export default FileItemList;