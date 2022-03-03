import React, { useState, useRef, useEffect } from "react";

import ChatMessages from "./ChatMessages/ChatMessages";
import ChatFooter from "./ChatFooter/ChatFooter";

import NameInitials from "components/StyledComponent/NameInitals";
import convertToNameInitials from "utils/ConvertNameInitials";
import useWindowSize from "utils/useWindowResize";
import useLocalStorge from "Hooks/useLocalStorage";

import styles from "./ChatBox.module.scss";

function ChatBox() {
  const [msgList, setMsgList] = useLocalStorge("msgList", []);
  const isMobileView = useWindowSize() < 769;
  const [name] = useState("Chat Bot");
  const lastestMessage = useRef();

  const onSend = (message) => {
    const msgObj = {
      userType: "user",
      content: message,
      timestamp: new Date(),
    };

    lastestMessage.current = msgObj;
    setMsgList([...msgList, msgObj]);
  };

  useEffect(() => {
    if (msgList.length == 0 || msgList[msgList.length - 1].userType == "bot")
      return;
    const lastMsg = lastestMessage.current;
    const botMsg = {
      ...lastMsg,
      userType: "bot",
      timestamp: new Date(),
    };
    setTimeout(() => setMsgList((msgList) => [...msgList, botMsg]), 1500);
  }, [msgList]);

  return (
    <div
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <NameInitials
            width={isMobileView ? "35px" : ""}
            height={isMobileView ? "35px" : ""}
          >
            {convertToNameInitials(name)}
          </NameInitials>
          <div className={styles.info}>
            <p className={styles.title}>{name} </p>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <ChatMessages mobileView={isMobileView} messages={msgList} />
      </div>
      <div className={styles.footer}>
        <ChatFooter mobileView={isMobileView} onSend={onSend} />
      </div>
    </div>
  );
}

export default ChatBox;
