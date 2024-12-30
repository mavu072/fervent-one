import React, { useState, useEffect, useRef, useContext } from 'react';
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
import MessageFactory from '../../../factory/MessageFactory';
import FileFactory from '../../../factory/FileFactory';
import ReportFactory from '../../../factory/ReportFactory';
import { getAssistantResponse } from '../../../api/GetAssistantResponseApi';
import { getServerTimestamp } from '../../../firebase/firebaseUtil';
import { formatTime } from '../../../util/dateTimeUtil';
import { scrollbarStyle } from '../util/scrollbarUtil';
import { grey } from '@mui/material/colors';
import { appName } from '../../../util/appNameUtil';
import { exampleComplianceReport } from '../../../api/examples/complianceReportExample';
import { USER, SYSTEM, OPEN_INTERNAL } from '../../variables/constants';
import { AppContext } from '../../context-provider/AppContext';
import { ServiceContext } from '../../context-provider/ServiceContext';

const messageFactory = new MessageFactory();
const fileFactory = new FileFactory();
const reportFactory = new ReportFactory();

const systemUser = { displayName: appName };
const complianceReportQueries = [
  "Please do a quick legal compliance check on this file.",
  "Are these documents compliant with the law?"
];

const DEF_MESSAGE_LIMIT = 10; // Default message limit.

/**
 * MessagesPane.
 * @returns JSX Component
 */
function MessagesPane() {
  const { user } = useContext(AppContext);
  const { messageService, fileService, reportService } = useContext(ServiceContext);

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
   * Scrolls current ref into view.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Scrolls messages pane into the current scroll top position saved in the state.
   */
  const scrollToPosition = () => {
    messagesContainerRef.current?.scrollTo({ top: scrollTopPosition, behavior: "smooth" });
  };

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
    const addedFiles = [];
    const newFiles = [];
    const maxSize = 20000000; // 20 MB In Bytes

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      addedFiles.push(file);
    }

    const isThereFilesTooLarge = addedFiles.some(file => file.size > maxSize);
    if (isThereFilesTooLarge) {
      const acceptableFiles = addedFiles.filter(file => file.size < maxSize);
      newFiles.push(...acceptableFiles);
      setErrorMsg(`Files larger than 20 MB are not allowed.`);
    } else {
      newFiles.push(...addedFiles);
    }

    setSelectedFiles((prevFiles) => {
      return [...prevFiles, ...newFiles];
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
      const userId = user.uid;
      const uploadedFiles = [...selectedFiles]; // Store in a local variable. The global var is clear when submission is triggered.

      // Save user message and start typing effect.
      const userMsg = messageFactory.createMessage({
        content: textMessageInput,
        userId,
        role: USER,
        createdAt: getServerTimestamp()
      });
      await messageService.save(userMsg).then((res) => {
        console.log("Saved message:", res);
        setIsTyping(true);
      });

      // Prepare any uploaded files for saving.
      const attachmentMsgList = []; // To record upload in messages collection.
      const attachmentList = []; // To save files in files collection.
      if (uploadedFiles.length > 0) {
        // Create messages.
        attachmentMsgList.push(...uploadedFiles.map(file =>
          messageFactory.createMessage({
            attachment: { name: file.name, size: file.size, type: file.type },
            userId,
            role: USER,
            createdAt: getServerTimestamp()
          })
        ));
        // Create files.
        attachmentList.push(...uploadedFiles.map(file =>
          fileFactory.createFile({
            name: file.name,
            size: file.size,
            type: file.type,
            createdAt: getServerTimestamp()
          })
        ));
      }

      // Save file messages.
      const savedMsgs = attachmentMsgList.map(msg => messageService.save(msg));
      await Promise.all(savedMsgs)
        .then((res) => {
          console.log("Saved attachment messages:", res);
        });

      // Save files.
      const savedAttachments = attachmentList.map(attachment => fileService.save(attachment));
      await Promise.all(savedAttachments)
        .then((res) => {
          console.log("Saved attachments:", res);
          // Will need attachment Ids to link to Report later.
        });

      // Get assistant responses.
      const assistantReponses = [];
      if (uploadedFiles.length > 0) {
        // Handle file response.

        // 1. Send all uploaded files as one list. 
        console.log("Sending files to API...");
        await setTimeout(() => { }, 1000); // simulate API call.

        // 2. The API will read all as single input and return a single processing result.
        const filesResponse = exampleComplianceReport;  // Use example data to mock response.

        // 3. Save the result as a report.
        const fileReport = reportFactory.createComplianceReportFromPayload(filesResponse);
        const savedReport = await reportService.save(fileReport);
        console.log("Saved report", savedReport);

        // 4. Later, will link the report to all the files uploaded in this action.
        const reportId = savedReport.id;

        // 5. The report will contain a list of all document analysed and the content found on them.
        assistantReponses.push({ content: `Your ${uploadedFiles.length > 1 ? "files have" : "file has"} been processed.` });
        // 6. A Report link will be saved as an assistant message. 
        // When clicking the link, the Id will be used to fetch the report data for display.
        assistantReponses.push({
          sources: [{ title: "Check Compliance Report.", link: `/${reportId}`, type: OPEN_INTERNAL }],
        });
        console.log("Your files have been processed.");
      } else {
        // Handle text response.
        const { response, sources } = await getAssistantResponse(textMessageInput, chatHistory);
        assistantReponses.push({ content: response, sources });
      }

      // Create assistant messages.
      const assistantMsgs = assistantReponses.map(({ content, sources }) => {
        return messageFactory.createMessage({ content, sources, userId, role: SYSTEM, createdAt: getServerTimestamp() });
      });

      // Save assistant messages.
      const savedAssistantMsgs = assistantMsgs.map(msg => messageService.save(msg));
      await Promise.all(savedAssistantMsgs)
        .then((res) => {
          console.log("Assistant messages:", res);
          setIsTyping(false); // Stop typing effect.
        });

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setIsTyping(false);
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