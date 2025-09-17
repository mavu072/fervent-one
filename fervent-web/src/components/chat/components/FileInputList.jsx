import React from "react";
import Stack from '@mui/material/Stack';
import FileInput from './FileInput';
import { scrollbarStyle } from '../../ui/scrollbarUtil';

/**
 * FileInputList.
 * @param {object} props
 * @param {Array<File>} props.fileList Stored state of the files.
 * @param {Function} props.onRemoveFile
 * @returns JSX Component
 */
function FileInputList({ fileList, onRemoveFile }) {
    return (
        <Stack
            gap={1}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                pb: fileList?.length > 0 ? 1 : 0,
                px: fileList?.length > 0 ? 1 : 0,
                pt: fileList?.length > 0 ? 1 : 0,
                ...scrollbarStyle,
                overflowY: 'hidden',
                overflowX: 'auto',
            }}
        >
            {fileList && fileList.map((file, index) => (
                <FileInput
                    key={index}
                    fileId={index}
                    file={file}
                    onRemoveFile={onRemoveFile}
                />
            ))}
        </Stack>
    );
}

export default FileInputList;