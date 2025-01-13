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
import SnackBarNotification from '../notification/SnackBar';
import LoadMoreButton from './components/LoadMoreButton';
import AccountAvatar from '../account/components/AccountAvatar';
import { formatTime } from '../../util/dateTimeUtil';
import { scrollbarStyle } from '../ui/scrollbarUtil';
import { grey } from '@mui/material/colors';
import { appName } from '../../util/appNameUtil';
import { AppContext } from '../context-provider/AppContext';
import { ServiceContext } from '../context-provider/ServiceContext';
import { DEF_MESSAGE_LIMIT } from '../../constants/messageConstants';
import { scrollToBottom } from '../ui/scrollUtil';

const systemUser = { displayName: appName };
const complianceReportQueries = [
  "Please do a quick legal compliance check on this file.",
  "Are these documents compliant with the law?"
];

/**
 * MessagesPane.
 * @returns JSX Component
 */
function MessagesPane() {
  const { user } = useContext(AppContext);
  const { messageResponderService: messageResponder, messageService } = useContext(ServiceContext);

  const [messageLimit, setMessageLimit] = useState(DEF_MESSAGE_LIMIT);
  const [query, setQuery] = useState(messageService.getAll(messageLimit));
  const [messages, isMessagesloading, messagesError] = useCollection(query);

  const [textMessageInput, setTextMessageInput] = useState("");
  const [previousTextMessageInput, setPreviousTextMessageInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollTopPosition, setScrollTopPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null); // TODO Move to Context.

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);

  // Effect: Update `messages` query when loading more messages.
  useEffect(() => {
    setQuery(messageService.getAll(messageLimit));
  }, [messageLimit]);

  // Effect: Update chat history state, when `messages` get updated.
  useEffect(() => {
    scrollToBottom(messagesEndRef);
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

  // Effect: Force-set a compliance query when a file is uploaded. Peforming custom quering on files, may be implemented in the future.
  useEffect(() => {
    if (selectedFiles.length > 0) {
      if (!complianceReportQueries.includes(textMessageInput)) {
        setPreviousTextMessageInput(textMessageInput); // Save previous input.
        // Set compliance query.
        if (selectedFiles.length == 1) {
          setTextMessageInput(complianceReportQueries[0]);
        } else {
          setTextMessageInput(complianceReportQueries[1]);
        }
      }
    } else {
      // Reverse to previous input when the files are removed.
      if (complianceReportQueries.includes(textMessageInput)) {
        setTextMessageInput(previousTextMessageInput);
      }
    }
  }, [selectedFiles, textMessageInput, previousTextMessageInput])

  // Effect: Show messages error, when it occurs.
  useState(() => {
    if (messagesError) {
      setErrorMsg(messagesError.message);
    }
  }, [messagesError]);


  /**
  * Sets or updates scroll top position state.
  * @param {React.SyntheticEvent} event 
  */
  const handleScroll = (event) => {
    setScrollTopPosition(event.currentTarget.scrollTop);
  }

  /**
   * Sets or updates message limit state.
   */
  const handleLoadOlder = () => {
    setMessageLimit((prevLimit) => {
      return prevLimit + 10;
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
    const newFiles = [];
    const maxSize = 20000000; // 20 MB In Bytes. TODO: Add to constants. 
    const addedFiles = Array.from(fileList); // Convert list to array.
    const isThereFilesTooLarge = addedFiles.some(file => file.size > maxSize);
    const existingFiles = selectedFiles.map(file => file.name);

    // Filter large files.
    if (isThereFilesTooLarge) {
      const acceptableFiles = addedFiles.filter(file => file.size < maxSize);
      newFiles.push(...acceptableFiles);
      setErrorMsg(`Files larger than 20 MB are not allowed.`);
    } else {
      newFiles.push(...addedFiles);
    }

    // Filter duplicate files.
    const uniqueNewFiles = newFiles.filter(fl => !existingFiles.includes(fl.name));

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
      await messageResponder.saveHumanMessage(newUserMsg);
      setIsTyping(true);

      if (uploadedFiles.length > 0) {
        // Save file messages and files.
        const savedMsgsAndFiles = await messageResponder.saveHumanFiles(uploadedFiles)
        console.log("Saved messages and files:", savedMsgsAndFiles);
        // Will need attachment Ids to link to Report later.

        // Get assisant response to text with files.
        const savedResp = await messageResponder.getAndSaveSystemResponseWithFiles(uploadedFiles);
        console.log("Assistant response:", savedResp);

        
      } else {
        // Get assisant response to text.
        const savedResp = await messageResponder.getAndSaveSystemResponse(newUserMsg, chatHistory);
        console.log("Assistant message:", savedResp);
      }

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
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
      {errorMsg && <SnackBarNotification message={errorMsg} />}
      <Box
        ref={messagesContainerRef}
        onScroll={handleScroll}
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