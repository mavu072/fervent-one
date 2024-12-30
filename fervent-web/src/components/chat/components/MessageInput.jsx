import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from './TextareaAutosize';
import UploadFile from './UploadFile';
import SendMessageButton from './SendMessageButton';
import FileItemList from './FileItemList';
import { scrollbarStyle } from '../util/scrollbarUtil';

/**
 * MessageInput.
 * @param {object} props 
 * @param {string} props.textMessageInput Stored state of the message input.
 * @param {Function} props.onChangeTextMessageInput Updater function for the saved state of the message input.
 * @param {Array<File>} props.selectedFiles Stored state of the file input.
 * @param {Function} props.onAddSelectedFiles Updater function for the saved state of the file input.
 * @param {Function} props.onRemoveFile Removes a file from the saved state.
 *  @param {Function} props.onRemoveAllFiles Removes all files from the saved state.
 * @param {Function} props.onSubmit Submit action handler.
 * @returns JSX Component
 */
function MessageInput({ textMessageInput, onChangeTextMessageInput, selectedFiles, onAddSelectedFiles, onRemoveFile, onRemoveAllFiles, onSubmit, }) {
    const textAreaRef = useRef(null);

    function handleChange(event) {
        onChangeTextMessageInput(event.target.value);
    }

    function handleClick() {
        if (textMessageInput.trim() !== '') {
            onSubmit();
            onChangeTextMessageInput('');
            onRemoveAllFiles();
        }
    };

    function handeKeyDown(event) { 
        // Ctrl/Command + Enter sends message.
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            handleClick();
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            width: '100%',
            px: 2,
            pb: 1,
            pt: 1,
        }}>
            <FileItemList fileList={selectedFiles} onRemoveFile={onRemoveFile} />
            <Stack
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <Stack sx={{ pb: 3 }}>
                    <UploadFile onAddSelectedFiles={onAddSelectedFiles} />
                </Stack>
                <FormControl sx={{ flexGrow: 1, mb: 2.5, px: 1, }}>
                    <TextareaAutosize
                        placeholder="Hello, how I can help you today…"
                        aria-label="Message"
                        ref={textAreaRef}
                        onChange={handleChange}
                        value={textMessageInput}
                        minRows={1}
                        maxRows={5}
                        onKeyDown={handeKeyDown}
                        sx={{
                            flexGrow: 1,
                            border: "none",
                            borderBottom: "1px solid grey",
                            borderRadius: 0,
                            '& textarea:first-of-type': {
                                minHeight: 72,
                            },
                            ...scrollbarStyle,
                        }}
                    />
                </FormControl>
                <Stack sx={{ pb: 3 }}>
                    <SendMessageButton onSendMessage={handleClick} />
                </Stack>
            </Stack>
        </Box>
    );
}

export default MessageInput;