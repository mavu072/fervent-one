import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from './TextareaAutosize';
import UploadFileButton from '../../buttons/UploadFileButton';
import SendMessageButton from './SendMessageButton';
import FileInputList from './FileInputList';
import { scrollbarStyle } from '../../ui/scrollbarUtil';

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
        if (textMessageInput.trim() !== '' || selectedFiles?.length > 0) {
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
            pb: { xs: 4, md: 2 },
            pt: 1,
        }}>
            <FileInputList fileList={selectedFiles} onRemoveFile={onRemoveFile} />
            <Stack
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <Stack>
                    {/* To be supported later: .jpg,.jpeg,.png, */}
                    <UploadFileButton onAddSelectedFiles={onAddSelectedFiles} accept=".pdf" multiple />
                </Stack>
                <FormControl sx={{ flexGrow: 1, px: 1, }}>
                    <TextareaAutosize
                        placeholder="Hi, how I can help you today?"
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
                <Stack>
                    <SendMessageButton onSendMessage={handleClick} />
                </Stack>
            </Stack>
        </Box>
    );
}

export default MessageInput;