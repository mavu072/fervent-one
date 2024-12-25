import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextBubble from './TextBubble';
import AttachmentBubble from './AttachmentBubble';
import AccountAvatar from './AccountAvatar';
import { appName } from '../../../util/appNameUtil';

/**
 * ChatBubble.
 * @param {object} props
 * @param {firebase.User} props.user
 * @param {"sent" | "received"} props.variant
 * @param {string} props.content
 * @param {object | undefined} props.attachment (Optional) File Attachment
 * @param {string} props.arrivedAt Date String
 * @returns JSX Component
 */
function ChatBubble({ user, variant, content, attachment = undefined, arrivedAt }) {
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
      <Stack
        display="flex"
        direction="row"
        spacing={1}
      >
        {!isSent && <AccountAvatar user={{ displayName: appName }} placement={"right"} />}
        {attachment ?
          <AttachmentBubble isSent={isSent} attachment={attachment} arrivedAt={arrivedAt} />
          : <TextBubble isSent={isSent} content={content} arrivedAt={arrivedAt} />}
        {isSent && <AccountAvatar user={user} tooltipTitle={"You"} placement={"left"} />}
      </Stack>
    </Box>
  );
}

export default ChatBubble;