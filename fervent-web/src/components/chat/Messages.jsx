import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChatBubble from './components/ChatBubble';
import MessageInput from './components/MessageInput';
import MessageBubbles from './components/MessageBubbles';
import InlineLoader from '../loader/InlineLoader';
import SectionLoader from '../loader/SectionLoader';
import LoadMoreButton from '../buttons/LoadMoreButton';
import AccountAvatar from '../account/AccountAvatar';
import MessageService from '../../service/MessageService';
import FileService from '../../service/FileService';
import ReportService from '../../service/ReportService';
import MessageResponderService from '../../service/MessageResponderService';
import { AppContext } from '../context-provider/AppContext';
import { ServiceContext } from '../context-provider/ServiceContext';
import { scrollbarStyle } from '../ui/scrollbarUtil';
import { scrollTo } from '../ui/scrollUtil';
import {
  appName, MESSAGES_TITLE, DISCLAIMER_EXPERIMENTAL_AI, WARNING_HIDE_SENSITIVE_INFO
} from '../../config/appConfig';
import {
  DEF_MESSAGE_LIMIT, FILE_SIZE_LIMIT, LIMIT_INCREMENT_VALUE
} from '../../constants/messageConstants';

const systemUser = { displayName: appName };

/**
 * Messages.
 * @returns JSX Component
 */
function Messages() {
  const { user, onInfoMessage } = useContext(AppContext);
  const { messageRepository, fileRepository, reportRepository } = useContext(ServiceContext);
  const messageService = new MessageService(messageRepository);
  const messageResponder = new MessageResponderService({
    userId: user.uid,
    messageService: messageService,
    fileService: new FileService(fileRepository),
    reportService: new ReportService(reportRepository)
  });

  const [messageLimit, setMessageLimit] = useState(DEF_MESSAGE_LIMIT);
  const [query, setQuery] = useState(messageService.getAll(messageLimit));
  const [messages, isMessagesloading, messagesError] = useCollection(query);

  const [textMessageInput, setTextMessageInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null)

  const cacheChatHistory = useCallback(async () => {
    messageService.getChatHistory()
      .then((chat) => {
        setChatHistory(chat);
      });
  }, [setChatHistory]);

  const scrollToBottom = () => scrollTo(messagesEndRef);
  const scrollToTop = () => scrollTo(messagesTopRef);

  useEffect(() => {
    // Effect: Fetch and cache chat history when component mounts.
    cacheChatHistory();
  }, []); // Run only on mount.

  useEffect(() => {
    // Effect: Update messages query when loading more messages.
    setQuery(messageService.getAll(messageLimit));
  }, [messageLimit]);

  useEffect(() => {
    // Effect: Scroll to bottom or top, when messages get updated and update chat history.
    if (messages && messages?.docs.length > 0) {
      // Filter changes to get new and/or older messages.
      const docChangesModified = messages.docChanges().filter((docChange) => docChange.type === "modified");
      const docChangesAdded = messages.docChanges().filter((docChange) => docChange.type === "added");

      if (docChangesModified.length > 0) {
        // New documents have been created: Add to chat history and scroll to bottom.
        const docChanged = docChangesModified.shift();
        updateChatHistory(docChanged.doc);
        scrollToBottom();
      } else if (docChangesAdded.length > 1 && messageLimit > DEF_MESSAGE_LIMIT) {
        // No new document created, but added more into collection ref and message limit is altered:
        // Assuming user intends to view older messages, scroll to top.
        scrollToTop();
      }
    }
  }, [messages]);

  useState(() => {
    // Effect: Show messages error, when it occurs.
    if (messagesError) {
      onInfoMessage(messagesError?.message || "Firebase Error");
    }
  }, [messagesError]);

  /**
   * Sets or updates text message input state.
   * @param {string} newInput 
   */
  const handleChangeTextMessageInput = (newInput) => {
    setTextMessageInput(newInput);
  }

  /**
   * Add new message to chat history.
   * @param {object} msg DocumentData.
   */
  const updateChatHistory = (msg) => {
    const { content, role } = msg.data();
    const newMsg = { content, role: role === "user" ? "human" : "ai", };
    // console.log("New messages formatted", newMsg);
    if (newMsg.content) {
      setChatHistory((prevChatHistory) => {
        return [...prevChatHistory, ...[newMsg]];
      });
    }
    // console.log("Chat History", chatHistory);
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
      onInfoMessage("The amount of files you upload must not exceed 5 MB in total.");
      uniqueNewFiles = [];
    }

    setSelectedFiles((prevFiles) => {
      return [...prevFiles, ...uniqueNewFiles];
    });
  }

  /**
   * Removes specified file from current state.
   * @param {number} fileId 
   */
  const handleRemoveFile = (fileId) => {
    const updated = selectedFiles.filter((file, index) => index !== fileId);
    setSelectedFiles(updated);
  }

  /**
   * Removes all selected files from current state.
   */
  const handleRemoveAllFiles = () => {
    setSelectedFiles([]);
  }

  /**
   * Increments message limit to load older messages.
   */
  const handleLoadOlder = () => {
    setMessageLimit((prevLimit) => {
      return prevLimit + LIMIT_INCREMENT_VALUE;
    });
  };

  /**
   * Send message or upload files.
   */
  const handleSubmit = async () => {
    try {
      scrollToBottom();
      // Store in local variables. The global vars are cleared when submission is triggered.
      const newUserMsg = textMessageInput;
      const uploadedFiles = [...selectedFiles];
      // 1. Save files.
      if (uploadedFiles.length > 0) {
        await messageResponder.saveHumanFiles(uploadedFiles);
      }
      // 2. Save user message.
      if (newUserMsg && newUserMsg.trim() !== '') {
        await messageResponder.saveHumanMessage(newUserMsg);
      }
      // 3. Start typing effect.
      setIsTyping(true);
      // 4. Upload files.
      if (uploadedFiles.length > 0) {
        await messageResponder.uploadFiles(uploadedFiles);

        // 4. a) Create confirmation message.
        if ((!newUserMsg || newUserMsg.trim() === '')) {
          const noun = uploadedFiles.length > 1 ? "files" : "file";
          let confirmMsg = `I received the ${noun}. How would you like me to help with ${noun == "files" ? "them" : "it"}?`;
          confirmMsg += `\n\nFor example, I can answer questions based on the contents.`;
          await messageResponder.saveSystemMessage({ content: confirmMsg });
        }
      }
      // 6. Create response to message and/or files.
      await messageResponder.getSystemResponse(newUserMsg, chatHistory);
    } catch (error) {
      onInfoMessage(error?.message || "Messaging Error");
    } finally {
      // Finally: Stop typing effect.
      setIsTyping(false);
    }
  }

  return (
    <Paper
      sx={{
        height: 'calc(100dvh - var(--Header-height))',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        backgroundColor: 'background.body',
        borderRadius: 0,
      }}
    >
      <title>
        {MESSAGES_TITLE} – {appName}
      </title>
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
        <Stack spacing={2} justifyContent="flex-end" >
          <div ref={messagesTopRef}></div>
          {messages && messages.size > 0 &&
            <Stack display="flex" alignItems="center">
              <LoadMoreButton title={"Load older messages"} onLoadMore={handleLoadOlder} />
            </Stack>
          }
          {messages && <MessageBubbles user={user} systemUser={systemUser} messages={messages} />}
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
          <Stack display="flex" alignItems="center" textAlign="center" px={2} color={"text.secondary"} >
            <Typography variant="caption">{DISCLAIMER_EXPERIMENTAL_AI} {WARNING_HIDE_SENSITIVE_INFO}</Typography>
          </Stack>
        </Stack>
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

export default Messages;