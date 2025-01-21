import React, { useState, useEffect, useRef, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChatBubble from './components/ChatBubble';
import MessageInput from './components/MessageInput';
import InlineLoader from '../loader/InlineLoader';
import SectionLoader from '../loader/SectionLoader';
import LoadMoreButton from '../buttons/LoadMoreButton';
import AccountAvatar from '../account/AccountAvatar';
import { formatTime } from '../../util/dateTimeUtil';
import { scrollbarStyle } from '../ui/scrollbarUtil';
import { grey } from '@mui/material/colors';
import { appName } from '../../util/appNameUtil';
import { AppContext } from '../context-provider/AppContext';
import { ServiceContext } from '../context-provider/ServiceContext';
import { DEF_MESSAGE_LIMIT, FILE_SIZE_LIMIT, LIMIT_INCREMENT_VALUE } from '../../constants/messageConstants';
import { scrollTo } from '../ui/scrollUtil';

const systemUser = { displayName: appName };

/**
 * MessagesPane.
 * @returns JSX Component
 */
function MessagesPane() {
  const { user, onInfoMessage } = useContext(AppContext);
  const { messageResponderService: messageResponder, messageService } = useContext(ServiceContext);

  const [messageLimit, setMessageLimit] = useState(DEF_MESSAGE_LIMIT);
  const [query, setQuery] = useState(messageService.getAll(messageLimit));
  const [messages, isMessagesloading, messagesError] = useCollection(query);

  const [textMessageInput, setTextMessageInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);

  useEffect(() => {
    // Effect: Update `messages` query when loading more messages.
    setQuery(messageService.getAll(messageLimit));
  }, [messageLimit]);

  useEffect(() => {
    // Effect: Scrolling, when `messages` get updated.
    scrollTo(messagesEndRef); // Scroll to bottom

    // Effect: Update chat history state, when `messages` get updated.
    setChatHistory(() => {
      return messages?.docs.map(msg => {
        const { content, role } = msg.data();
        return {
          role: role === "user" ? "human" : "system",
          content: content,
        }
      }).filter(msg => msg.content);
    });
  }, [messages]);

  useState(() => {
    // Effect: Show messages error, when it occurs.
    if (messagesError) {
      onInfoMessage(messagesError?.message || "Firebase Error");
    }
  }, [messagesError]);

  /**
   * Sets or updates message limit state.
   */
  const handleLoadOlder = () => {
    setMessageLimit((prevLimit) => {
      return prevLimit + LIMIT_INCREMENT_VALUE;
    });
  };

  /**
   * Sets or updates text message input state.
   * @param {string} newInput 
   */
  const handleChangeTextMessageInput = (newInput) => {
    setTextMessageInput(newInput);
  }

  /**
   * Adds selected files in current state.
   * @param {FileList} fileList
   */
  const handleAddSelectedFiles = (fileList) => {
    const maxSize = FILE_SIZE_LIMIT; // In Bytes.
    const addedFiles = Array.from(fileList); // Convert list to array.
    const existingFiles = selectedFiles.map(file => file.name);
    let uniqueNewFiles = addedFiles.filter(fl => !existingFiles.includes(fl.name)); // Filter duplicate files.

    // File total.
    let totalFileSize = 0;

    // Count file total.
    uniqueNewFiles.forEach(file => {
      totalFileSize = totalFileSize + file.size;
    });
    selectedFiles.forEach(file => {
      totalFileSize = totalFileSize + file.size;
    });

    // Show error, if required.
    if (totalFileSize > maxSize) {
      onInfoMessage("The amount of files you upload must not exceed 2 MB in total.");
      uniqueNewFiles = [];
    }

    setSelectedFiles((prevFiles) => {
      return [...prevFiles, ...uniqueNewFiles];
    });
  }

  /**
   * Removes specified file from current state.
   * @param {*} fileId 
   */
  const handleRemoveFile = (fileId) => {
    const updated = selectedFiles.filter((file, index) => index !== fileId);
    setSelectedFiles(updated);
  }

  /**
   * Removes all files from current state.
   */
  const handleRemoveAllFiles = () => {
    setSelectedFiles([]);
  }

  /**
   * Send message or upload selected files.
   */
  const handleSubmit = async () => {
    try {
      // Store in local variables. The global vars are cleared when submission is triggered.
      const newUserMsg = textMessageInput;
      const uploadedFiles = [...selectedFiles];

      // Save user message and start typing effect.
      if (newUserMsg.trim() !== '') {
        await messageResponder.saveHumanMessage(newUserMsg);
      }
      setIsTyping(true);

      if (uploadedFiles.length > 0) {
        // Save file messages and files.
        const savedMsgsAndFiles = await messageResponder.saveHumanFiles(uploadedFiles)
        console.log("Saved messages and files:", savedMsgsAndFiles);

        // Get assisant response to text with files.
        const savedResp = await messageResponder.getAndSaveSystemResponseWithFiles(uploadedFiles);
        console.log("Assistant response:", savedResp);
      } else {
        // Get assisant response to text.
        const savedResp = await messageResponder.getAndSaveSystemResponse(newUserMsg, chatHistory);
        console.log("Assistant message:", savedResp);
      }

    } catch (error) {
      onInfoMessage(error?.message || "Messaging Error");
    } finally {
      setIsTyping(false); // Stop typing effect.
    }
  }

  return (
    <Paper
      sx={{
        height: 'calc(100dvh - var(--Header-height))',
        width: { xs: '100dvw', lg: 'calc(100dvw - var(--Sidebar-width))' },
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        backgroundColor: 'background.body',
        borderRadius: 0,
      }}
    >
      {isMessagesloading && <SectionLoader />}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 0,
          ...scrollbarStyle,
          flexDirection: 'column-reverse'
        }}
      >
        {!isMessagesloading &&
          <Stack spacing={2} justifyContent="flex-end" >
            <div ref={messagesTopRef}></div>

            <Stack display="flex" alignItems="center">
              <LoadMoreButton title={"Load older messages"} onLoadMore={handleLoadOlder} />
            </Stack>

            {messages && messages.docs.map((message, index) => {
              const { id, content, sources, attachment, role, createdAt } = message.data();
              const isYou = role === 'user';
              const arrivedAt = createdAt ? formatTime(createdAt.toDate()) : 'now';
              return (
                <Stack key={index} direction="row" spacing={2} flexDirection={isYou ? 'row-reverse' : 'row'}>
                  <ChatBubble
                    key={id}
                    id={id}
                    variant={isYou ? 'sent' : 'received'}
                    content={content}
                    sources={sources}
                    attachment={attachment}
                    arrivedAt={arrivedAt}
                    sender={
                      isYou ? <AccountAvatar user={user} tooltipTitle={"You"} placement={"left"} />
                        : <AccountAvatar user={systemUser} tooltipTitle={systemUser.displayName} placement={"right"} />
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

            <Stack display="flex" alignItems="center" textAlign="center" px={2} color={grey[600]} >
              <Typography variant="caption">Do not share any sensitive information. i.e. tax or bank details.</Typography>
            </Stack>
          </Stack>
        }
      </Box>
      <MessageInput
        textMessageInput={textMessageInput}
        onChangeTextMessageInput={handleChangeTextMessageInput}
        selectedFiles={selectedFiles}
        onAddSelectedFiles={handleAddSelectedFiles}
        onRemoveFile={handleRemoveFile}
        onRemoveAllFiles={handleRemoveAllFiles}
        onSubmit={handleSubmit}
      />
    </Paper>
  );
}

export default MessagesPane;