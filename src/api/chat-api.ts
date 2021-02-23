type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export type StatusType = "pending" | "ready" | "error";

const subscribers = {
  "messages-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;
type EventsNamesType = "messages-received" | "status-changed";

const closeHandler = () => {
  console.log("CLOSE WS");
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const messageHandler = (event: MessageEvent) => {
  const newMessages = JSON.parse(event.data);
  subscribers["messages-received"].forEach((subscriber) => {
    subscriber(newMessages);
  });
};

const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};

const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.error("REFRESH PAGE");
};

const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((subscriber) => subscriber(status));
};

const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
};

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((subscriber) => subscriber !== callback);
    };
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((subscriber) => subscriber !== callback);
  },

  sendMessage(message: string) {
    ws?.send(message);
  },
};
