import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextBubble from './TextBubble';
import AttachmentBubble from './AttachmentBubble';

/**
 * ChatBubble.
 * @param {object} props
 * @param {"sent" | "received"} props.variant
 * @param {string | React.JSX.Element} props.content
 * @param {object | undefined} props.attachment (Optional) File Attachment.
 * @param {string} props.arrivedAt Date String
 * @param {React.JSX.Element | undefined} props.sender (Optional) Sender wrapped with a React component.
 * @returns JSX Component
 */
function ChatBubble({ variant, content, attachment = undefined, arrivedAt, sender = undefined }) {
  const isSent = variant === 'sent';

  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <GlobalStyles
        styles={{
          ':root': {
            '--Chat-Bubble-radius': '10px',
          },
        }}
      />
      <Stack display="flex" direction="row" spacing={1}>
        {!isSent && sender}

        {attachment ?
          <AttachmentBubble isSent={isSent} attachment={attachment} arrivedAt={arrivedAt} />
          : <TextBubble isSent={isSent} content={content} arrivedAt={arrivedAt} />}
        
        {isSent && sender}
      </Stack>
    </Box>
  );
}

export default ChatBubble;