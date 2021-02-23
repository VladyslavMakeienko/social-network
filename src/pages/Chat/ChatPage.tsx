import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC = () => {
  return <Chat />;
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && (
        <div>Some error occured. Please refresh the page.</div>
      )}
      <MessagesChat />
      <AddMessageFormChat />
    </div>
  );
};

const MessagesChat: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = event.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useLayoutEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((message, index) => {
        return <MessageChat key={message.id} message={message} />;
      })}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const MessageChat: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <img src={message.photo} alt="Avatar" style={{ width: "30px" }} />
        <strong>{message.userName}</strong>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);

const AddMessageFormChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };

  return (
    <div>
      <div>
        {" "}
        <textarea
          onChange={(event) => setMessage(event.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        {" "}
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
