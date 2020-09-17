import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  createField,
  Textarea,
} from "../../common/FormsControls/FormsControls";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validators";
import { NewMessageFormType } from "../Dialogs";

const maxLength100 = maxLengthCreator(100);

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>;

type PropsType = {};

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormValuesTypeKeys>(
          "Enter your message",
          "newMessageBody",
          [required, maxLength100],
          Textarea
        )}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm<NewMessageFormType>({ form: "dialogAddMessageForm" })(
  AddMessageForm
);
