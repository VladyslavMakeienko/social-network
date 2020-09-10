const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogsData: [
    { id: "1", name: "Vlad" },
    { id: "2", name: "Belle" },
    { id: "3", name: "Eugene" },
    { id: "4", name: "Sasha" },
    { id: "5", name: "Tanya" },
    { id: "6", name: "Alex" },
  ],
  messagesData: [
    { id: "1", message: "Hi" },
    { id: "2", message: "How is your React learning?" },
    { id: "3", message: "Yo" },
    { id: "4", message: "Yo" },
    { id: "5", message: "Yo" },
  ],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [...state.messagesData, { id: "6", message: body }],
      };
    }
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => {
  return {
    type: SEND_MESSAGE,
    newMessageBody,
  };
};

export default messagesReducer;
