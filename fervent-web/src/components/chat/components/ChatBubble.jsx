import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextBubble from './TextBubble';
import AttachmentBubble from './AttachmentBubble';

/**
 * ChatBubble. 
 * @description A chat bubble can be used to render a text content, hyperlinks or file attachment.
 * @param {object} props
 * @param {"sent" | "received"} props.variant Component variant.
 * @param {string} props.id Message or Attachment Id.
 * @param {string | React.JSX.Element | null} props.content (Optional) File Content.
 * @param {object | null} props.attachment (Optional) File Attachment.
 * @param {Array<object> | null} props.sources (Optional) List of sources.
 * @param {string} props.arrivedAt Date.
 * @param {React.JSX.Element | null} props.sender (Optional) Sender wrapped with a React component.
 * @returns JSX Component
 */
function ChatBubble({ variant, id, content = null, sources = null, attachment = null, arrivedAt, sender = null }) {
  const isSent = variant === 'sent'; // Controls placement of sender and background colors.

  return (
    <Box sx={{ maxWidth: { xs: '80%', sm: '60%' }, minWidth: 'auto' }}>
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
          <AttachmentBubble key={id} isSent={isSent} attachment={attachment} arrivedAt={arrivedAt} />
          : <TextBubble key={id} isSent={isSent} content={content} sources={sources} arrivedAt={arrivedAt} />}
        
        {isSent && sender}
      </Stack>
    </Box>
  );
}

export default ChatBubble;