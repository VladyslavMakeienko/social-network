import React from "react";
import FormsControlStyles from "./FormsControlStyles.module.css";
import { FieldValidatorType } from "../../../utils/validators/validators";
import { Field, WrappedFieldProps } from "redux-form";
import { WrappedFieldMetaProps } from "redux-form/lib/Field";
import { LoginFormValuesType } from "../../Login/Login";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div
      className={
        FormsControlStyles.formControl +
        " " +
        (hasError ? FormsControlStyles.error : "")
      }
    >
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{" "}
      {text}
    </div>
  );
}
