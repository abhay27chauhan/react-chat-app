import React, { useState } from "react";

import ChatMessages from "./ChatMessages/ChatMessages";
import ChatFooter from "./ChatFooter/ChatFooter";

import NameInitials from "components/StyledComponent/NameInitals";
import convertToNameInitials from "utils/ConvertNameInitials";
import useWindowSize from "utils/useWindowResize";

import styles from "./ChatBox.module.scss";

function ChatBox() {
  const isMobileView = useWindowSize() < 769;
  const [name, setName] = useState("Chat Bot");
  const [msgList, setMsgList] = useState([]);

  const onSend = () => {};

  console.log(setMsgList, setName);
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
