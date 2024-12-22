import React, { useState, useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import InlineLoader from '../../loader/InlineLoader';
import SnackBarNotification from '../../notification/SnackBar';
import LoadMoreButton from './LoadMoreButton';
import MessageFactory from '../../../factory/MessageFactory';
import { getAssistantResponse } from '../../../service/AssistantResponseService';
import { getServerTimestamp } from '../../../firebase/firebaseUtil';
import { formatTime } from '../../../util/dateTimeUtil';
import PageLoader from '../../loader/PageLoader';
import { scrollbarStyle } from '../util/scrollbarUtil';
import { grey } from '@mui/material/colors';

const messageFactory = new MessageFactory();

export default function MessagesPane(props) {
  const { user, messageService, messageLimit, onLoadOlder } = props;

  const query = messageService.getAll(messageLimit);
  const [messages, isMessagesloading, messagesError] = useCollection(query);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setChatHistory(() => {
      return messages?.docs.map(msg => {
        const { content, role } = msg.data();
        return {
          role: role === "user" ? "human" : "system",
          content: content
        }
      })
    })
  }, [messages]);

  const handleSubmit = () => {
    const userMsg = messageFactory.createMessage({
      content: textAreaValue,
      userId: user.uid,
      role: "user",
      createdAt: getServerTimestamp(),
    });

    // Send message
    messageService.saveMessage(userMsg)
      .then(() => {
        setIsTyping(true);
        // Await response
        getAssistantResponse(textAreaValue, chatHistory)
          .then(({ response, sources }) => {
            const assistantMsg = messageFactory.createMessage({
              content: response,
              sources: sources,
              userId: user.uid,
              role: "assistant",
              createdAt: getServerTimestamp(),
            });

            messageService.saveMessage(assistantMsg);
          })
          .catch(error => {
            console.error(error);
            setErrorMsg(error.message);
          })
          .finally(() => {
            setIsTyping(false);
          });
      })
      .catch(error => {
        console.error(error);
        setErrorMsg(error.message);
        setIsTyping(false);
      });
  }

  const handleFileUpload = () => {
    // TODO implement
  }

  return (
    <Paper
      sx={(theme) => ({
        height: { xs: 'calc(100dvh - var(--Header-height))', sm: '100dvh', lg: '100dvh' },
        width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        backgroundColor: theme.palette.mode === 'light' ? 'background.body' : 'background.body'
      })}
    >
      {errorMsg && <SnackBarNotification message={errorMsg} />}
      {messagesError && <SnackBarNotification message={messagesError.message} />}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          ...scrollbarStyle,
          flexDirection: 'column-reverse'
        }}
      >
        {isMessagesloading && <PageLoader />}
        {!isMessagesloading && <Stack spacing={2} justifyContent="flex-end" >
          <Stack
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              pt: 4,
              justifyContent: "center"
            }}
          >
            {messages && <LoadMoreButton title={"Load older messages"} onLoadMore={onLoadOlder} />}
          </Stack>
          <div ref={messagesTopRef}></div>

          {messages && messages.docs.map((message, index) => {
            const { id, content, createdAt, attachment, role } = message.data();
            const isYou = role === 'user';
            const arrivedAt = createdAt ? formatTime(createdAt.toDate()) : 'now';
            return (
              <Stack key={index} direction="row" spacing={2} flexDirection={isYou ? 'row-reverse' : 'row'}>
                <ChatBubble
                  key={id}
                  user={user}
                  variant={isYou ? 'sent' : 'received'}
                  content={content}
                  attachment={attachment}
                  arrivedAt={arrivedAt}
                  role={role}
                />
              </Stack>
            );
          })}

          {isTyping &&
            <Paper
              variant='soft'
              sx={(theme) => ({
                px: 0.75,
                width: 'fit-content',
                height: 'fit-content',
                borderRadius: 'var(--Chat-Bubble-radius)',
                backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[800],
              })}
            >
              <InlineLoader />
            </Paper>}

          <div ref={messagesEndRef}></div>
        </Stack>}
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={handleSubmit}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </Paper>
  );
}
