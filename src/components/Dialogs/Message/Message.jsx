import React from "react";
import DialogsStyles from "./../Dialogs.module.css";

const Message = (props) => {
  return <div className={DialogsStyles.message}>{props.message}</div>;
};

export default Message;
