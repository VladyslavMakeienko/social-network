import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string;
  friend: "true" | "null" | "false";
};

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "", friend: "null" }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
