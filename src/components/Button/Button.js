import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";

function Button(props) {
  const buttonComponent = (
    <button
      id={props?.id}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} ${
        props.disabled ? styles["button-disabled"] : ""
      } ${props.className || ""}`}
      style={props.style}
    >
      {props.children}
    </button>
  );

  return buttonComponent;
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
};

export default Button;
