import { authAPI } from "./../api/auth-api";
import { stopSubmit } from "redux-form";
import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
  initialized: false,
};

type ActionsType = InferActionsTypes<typeof actions>;

export type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: "SN/APP/INITIALIZED_SUCCESS",
    } as const),
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
