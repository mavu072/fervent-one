import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import InlineLoader from '../../loader/InlineLoader';
import SnackBarNotification from '../../notification/SnackBar';
import LoadMoreButton from './LoadMoreButton';
import SectionLoader from '../../loader/SectionLoader';
import AccountAvatar from './AccountAvatar';
import MessageService from '../../../service/MessageService';
import MessageFactory from '../../../factory/MessageFactory';
import { getAssistantResponse } from '../../../api/GetAssistantResponseApi';
import { getServerTimestamp } from '../../../firebase/firebaseUtil';
import { formatTime } from '../../../util/dateTimeUtil';
import { scrollbarStyle } from '../util/scrollbarUtil';
import { grey } from '@mui/material/colors';
import { appName } from '../../../util/appNameUtil';

const messageFactory = new MessageFactory();
const systemUser = { displayName: appName };

/**
 * MessagesPane
 * @param {object} props 
 * @param {firebase.User} props.user
 * @param {MessageService} props.messageService
 * @param {number} props.messageLimit
 * @param {Function} props.onLoadOlder
 * @returns JSX Component
 */
function MessagesPane({ user, messageService, messageLimit, onLoadOlder }) {
  const query = messageService.getAll(messageLimit);
  const [messages, isMessagesloading, messagesError] = useCollection(query);

  const [textMessageInput, setTextMessageInput] = useState('');
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
    });
  }, [messages]);

  const onChangeTextMessageInput = (newInput) => {
    setTextMessageInput(newInput);
  }

  const onAddSelectedFiles = (newFiles) => {
    setSelectedFiles((prevFiles) => {
      return [...prevFiles, ...newFiles];
    });
  }

  const onRemoveFile = (fileId) => {
    const updated = selectedFiles.filter((file, index) => index !== fileId);
    setSelectedFiles(updated);
  }

  const handleSubmit = () => {
    const userMsg = messageFactory.createMessage({
      content: textMessageInput,
      userId: user.uid,
      role: "user",
      createdAt: getServerTimestamp(),
    });

    // Send message
    messageService.save(userMsg)
      .then(() => {
        setIsTyping(true);
        // Await response
        getAssistantResponse(textMessageInput, chatHistory)
          .then(({ response, sources }) => {
            const assistantMsg = messageFactory.createMessage({
              content: response,
              sources: sources,
              userId: user.uid,
              role: "assistant",
              createdAt: getServerTimestamp(),
            });

            messageService.save(assistantMsg);
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
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', sm: '100dvh', lg: '100dvh' },
        width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        backgroundColor: 'background.body',
      }}
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
        {isMessagesloading && <SectionLoader />}
        {!isMessagesloading &&
          <Stack spacing={2} justifyContent="flex-end" >
            <div ref={messagesTopRef}></div>
            <Stack display="flex" alignItems="center">
              <LoadMoreButton title={"Load older messages"} onLoadMore={onLoadOlder} />
            </Stack>

            {messages && messages.docs.map((message, index) => {
              const { id, content, createdAt, attachment, role } = message.data();
              const isYou = role === 'user';
              const arrivedAt = createdAt ? formatTime(createdAt.toDate()) : 'now';
              return (
                <Stack key={index} direction="row" spacing={2} flexDirection={isYou ? 'row-reverse' : 'row'}>
                  <ChatBubble
                    key={id}
                    variant={isYou ? 'sent' : 'received'}
                    content={content}
                    attachment={attachment}
                    arrivedAt={arrivedAt}
                    sender={
                      isYou ? <AccountAvatar user={user} tooltipTitle={"You"} placement={"left"} />
                        : <AccountAvatar user={systemUser} placement={"right"} />
                    }
                  />
                </Stack>
              );
            })}

            {isTyping &&
              (<Stack direction="row" spacing={2} flexDirection={'row'}>
                <ChatBubble
                  variant="received"
                  content={<InlineLoader />}
                  attachment={null}
                  arrivedAt="now"
                  sender={<AccountAvatar user={systemUser} placement={"right"} />}
                />
              </Stack>)}
            <div ref={messagesEndRef}></div>
          </Stack>
        }
      </Box>
      <Stack display="flex" alignItems="center" textAlign="center" px={2} color={grey[600]} >
        <Typography variant="caption">Do not share any sensitive information. i.e. tax or bank details.</Typography>
      </Stack>
      <MessageInput
        textMessageInput={textMessageInput}
        onChangeTextMessageInput={onChangeTextMessageInput}
        selectedFiles={selectedFiles}
        onAddSelectedFiles={onAddSelectedFiles}
        onRemoveFile={onRemoveFile}
        onSubmit={handleSubmit}
      />
    </Paper>
  );
}

export default MessagesPane;