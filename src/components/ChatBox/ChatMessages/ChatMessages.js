import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { formatAMPM, generateDateStamp } from "utils/Util";

import styles from "./ChatMessages.module.scss";

function ChatMessages(props) {
  const messagesEndRef = useRef(null);
  const lastMessageTimestampRef = useRef(null);
  lastMessageTimestampRef.current = null;

  const { messages } = props;
  const isMobileView = props.mobileView ? true : false;

  const showDateLabel = (timestamp) => {
    const messageDateString = new Date(timestamp).toDateString();
    const messageDate = messageDateString.slice(
      0,
      messageDateString.length - 5,
    );

    if (lastMessageTimestampRef.current === messageDate) {
      lastMessageTimestampRef.current = messageDate;
      return false;
    } else {
      lastMessageTimestampRef.current = messageDate;
      return true;
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      } custom-scroll`}
    >
      {messages?.map((item, index) => {
        return (
          <div key={index}>
            {showDateLabel(item.timestamp) && (
              <div className={styles.dateLabelContainer}>
                <div className={styles.dateLabel}>
                  {generateDateStamp(item.timestamp, true)}
                </div>
              </div>
            )}
            <div
              className={`${styles.message} ${
                item.profileId === "bot"
                  ? styles.messageRight
                  : styles.messageLeft
              }`}
            >
              <p>
                {item.content}
                <span>{formatAMPM(item.timestamp)}</span>
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

ChatMessages.propTypes = {
  messages: PropTypes.array,
  mobileView: PropTypes.bool,
};
export default ChatMessages;
