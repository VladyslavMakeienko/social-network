import { InferActionsTypes } from "./redux-store";

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

let initialState = {
  dialogsData: [
    { id: 1, name: "Vlad" },
    { id: 2, name: "Belle" },
    { id: 3, name: "Eugene" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Tanya" },
    { id: 6, name: "Alex" },
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your React learning?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;

const messagesReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/MESSAGES/SEND-MESSAGE": {
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 6, message: body }],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({
      type: "SN/MESSAGES/SEND-MESSAGE",
      newMessageBody,
    } as const),
};

export default messagesReducer;
