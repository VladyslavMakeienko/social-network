import React from "react";
import DialogsStyles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

const Dialogs = (props) => {
  let state = props.messagesPage;

  let DialogsElements = state.dialogsData.map((dialog) => {
    return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />;
  });

  let MessagesElements = state.messagesData.map((message) => {
    return (
      <Message message={message.message} key={message.id} id={message.id} />
    );
  });

  let newMessageBody = state.newMessageBody;

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className={DialogsStyles.dialogs}>
      <div className={DialogsStyles.dialogsItems}>{DialogsElements}</div>
      <div className={DialogsStyles.messages}>
        <div>{MessagesElements}</div>
        <AddMessageForm onSubmit={addNewMessage} />
        <div />
      </div>
    </div>
  );
};

export default Dialogs;
