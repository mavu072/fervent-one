import React from "react";
import Stack from "@mui/material/Stack";
import ChatBubble from "./ChatBubble";
import AccountAvatar from "../../account/AccountAvatar";
import { formatTime } from "../../../util/dateTimeUtil";

/**
 * MessageBubbles.
 * @param {object} props
 * @param {object} props.user
 * @param {object} props.systemUser
 * @param {object} props.messages
 * @param {Array<object>} props.messages.docs
 * @returns JSX Component.
 */
function MessageBubbles({ user, systemUser, messages }) {
    return (
        <React.Fragment>
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
                                isYou ? <AccountAvatar user={user} tooltipTitle={"You"} placement={"top-end"} />
                                    : <AccountAvatar user={systemUser} tooltipTitle={systemUser.displayName} placement={"top-start"} />
                            }
                        />
                    </Stack>
                );
            })}
        </React.Fragment>
    );
}

export default MessageBubbles;