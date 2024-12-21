import React, { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import MessagesPane from './MessagesPane';
import MessageRepository from '../../../repository/MessageRepository';
import MessageService from '../../../service/MessageService';

const INITIAL_MESSAGE_LIMIT = 10;

function MyMessages(props) {
  const { user, app } = props;
  const messageRepository = new MessageRepository(app, user.uid);
  const messageService = new MessageService(messageRepository);
  const [messageLimit, setMessageLimit] = useState(INITIAL_MESSAGE_LIMIT);

  const onLoadOlder = () => {
    setMessageLimit((prevLimit) => {
      return prevLimit + 10;
    });
  }

  return (
    <Paper
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        borderRadius: '0',
      }}
    >
      <MessagesPane
        user={user}
        messageService={messageService}
        messageLimit={messageLimit}
        onLoadOlder={onLoadOlder}
      />
    </Paper>
  );
}

export default MyMessages;