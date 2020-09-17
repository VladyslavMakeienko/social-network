import React from "react";
import DialogsStyles from "./../Dialogs.module.css";

type PropsType = {
  message: string;
};

const Message: React.FC<PropsType> = (props) => {
  return <div className={DialogsStyles.message}>{props.message}</div>;
};

export default Message;
