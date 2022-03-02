import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";
import emojiIcon from "assets/emojiIcon.svg";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import styles from "./ChatFooter.module.scss";

function ChatFooter(props) {
  const inputRef = useRef(null);

  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [emojiPicker, showEmojiPicker] = useState(false);
  const [currentRows, setCurrentRows] = useState(1);
  const isMobileView = props.mobileView ? true : false;

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const alt = document.getElementById("autoresize");

    if (event.target?.rows > 1 && !value?.includes("\n")) {
      setCurrentRows(1);
    }

    alt.style.height = "auto";
    alt.style.height = alt.scrollHeight + "px";

    setInputValue(value);
    if (value.trim()) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  };

  const submission = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    const { onSend } = props;
    onSend(inputValue, "text");
    setInputValue("");
    setCurrentRows(1);
    inputRef?.current?.focus();
    const alt = document.getElementById("autoresize");
    alt.style.height = "auto";
    showEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter" && !e.shiftKey) {
      submission(e);
    } else if (e.key == "Enter" && e.shiftKey) {
      setCurrentRows(3);
    }
  };

  const onEmojiClick = (e, emojiObject) => {
    setInputValue(inputValue + emojiObject.emoji);
    if (emojiObject.emoji) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  };
  const handleEmojiClose = () => {
    if (emojiPicker) showEmojiPicker(false);
  };

  return (
    <form
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
      onKeyPress={handleKeyPress}
      onSubmit={submission}
    >
      <div className={styles.inputBox}>
        {emojiPicker && (
          <div className={styles.emojiPicker}>
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          </div>
        )}
        <textarea
          autoFocus
          ref={inputRef}
          id="autoresize"
          className={`custom-scroll ${styles.textarea}`}
          value={inputValue}
          onChange={inputChangeHandler}
          type="text"
          placeholder="Type a message..."
          rows={currentRows}
          onClick={handleEmojiClose}
        />
        <div className={`${styles.emojiIcon} icon-on-hover`}>
          <img
            src={emojiIcon}
            alt="Emoji Icon"
            onClick={() => showEmojiPicker(!emojiPicker)}
          />
        </div>
      </div>
      <Button
        disabled={sendButtonDisabled}
        onClick={submission}
        className={styles.btn}
      >
        Send
      </Button>
    </form>
  );
}

ChatFooter.propTypes = {
  onSend: PropTypes.func,
  mobileView: PropTypes.bool,
};

export default ChatFooter;
