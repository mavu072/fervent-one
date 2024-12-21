import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextareaAutosize from './TextareaAutosize';
import UploadFile from './UploadFile';
import SendMessageButton from './SendMessageButton';
import FileItem from './FileItem';
import { scrollbarStyle } from '../util/scrollbarUtil';

export default function MessageInput(props) {
    const { textAreaValue, setTextAreaValue, onSubmit, selectedFiles, setSelectedFiles } = props;
    const textAreaRef = useRef(null);

    const handleClick = () => {
        if (textAreaValue.trim() !== '') {
            onSubmit();
            setTextAreaValue('');
        }
    };

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
            <Stack
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
                {selectedFiles && selectedFiles.map((file, index) => (
                    <FileItem key={index} file={file} />
                ))}
            </Stack>
            <Stack
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <Stack sx={{ pb: 3 }}>
                    <UploadFile setSelectedFiles={setSelectedFiles} />
                </Stack>

                <FormControl
                    sx={{
                        flexGrow: 1,
                        px: 1
                    }}
                >
                    <TextareaAutosize
                        placeholder="Hello, how I can help you today…"
                        aria-label="Message"
                        ref={textAreaRef}
                        onChange={(e) => {
                            setTextAreaValue(e.target.value);
                        }}
                        value={textAreaValue}
                        minRows={1}
                        maxRows={5}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                                // Ctrl + Enter sends message.
                                handleClick();
                            }
                        }}
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
                    <FormHelperText
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        Do not share any sensitive information. i.e. tax or bank details.
                    </FormHelperText>
                </FormControl>

                <Stack sx={{ pb: 3 }}>
                    <SendMessageButton onSendMessage={handleClick} />
                </Stack>
            </Stack>
        </Box>
    );
}
