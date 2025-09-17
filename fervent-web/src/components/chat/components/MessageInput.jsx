import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from './TextareaAutosize';
import UploadFileButton from '../../buttons/UploadFileButton';
import SendMessageButton from './SendMessageButton';
import FileInputList from './FileInputList';
import { scrollbarStyle } from '../../ui/scrollbarUtil';
import { grey } from '@mui/material/colors';

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
function MessageInput({
    textMessageInput,
    onChangeTextMessageInput,
    selectedFiles,
    onAddSelectedFiles,
    onRemoveFile,
    onRemoveAllFiles,
    onSubmit,
}) {
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
    }

    function handeKeyDown(event) {
        // Ctrl/Command + Enter sends message.
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            handleClick();
        }
    }

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]}`,
                borderRadius: 6,
                px: 0,
                py: 0,
            })}
        >
            <FileInputList fileList={selectedFiles} onRemoveFile={onRemoveFile} />

            <FormControl sx={{ width: '100%' }}>
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        px: { xs: '36px', sm: '40px' }, // padding so textarea doesn’t overlap buttons
                        py: { xs: '6px', sm: '4px' },
                        position: 'relative',
                    })}
                >
                    {/* Start adornment */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 4,
                            bottom: 4,
                        }}
                    >
                        <UploadFileButton
                            onAddSelectedFiles={onAddSelectedFiles}
                            accept=".pdf"
                            multiple
                        /> {/* To be supported later: .jpg,.jpeg,.png, */}
                    </Box>

                    {/* Textarea */}
                    <TextareaAutosize
                        id="Message-input"
                        placeholder="Send message"
                        aria-label="Message"
                        ref={textAreaRef}
                        onChange={handleChange}
                        value={textMessageInput}
                        minRows={1}
                        maxRows={5}
                        onKeyDown={handeKeyDown}
                        sx={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            background: 'transparent',
                            padding: { xs: '6px', sm: '8px' },
                            ...scrollbarStyle,
                        }}
                    />

                    {/* End adornment */}
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 4,
                            bottom: 4,
                        }}
                    >
                        <SendMessageButton onSendMessage={handleClick} />
                    </Box>
                </Box>
            </FormControl>
        </Box>
    );
}

export default MessageInput;