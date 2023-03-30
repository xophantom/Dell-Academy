import { Alert } from "@mui/material";
import React from "react";
import { FieldError, useFormContext } from "react-hook-form";

type Props = {
  errors?: (FieldError | undefined)[];
};

export const FormErrors: React.FC<Props> = ({ errors: errorsProp }) => {
  const form = useFormContext();

  const formState = form.formState;

  const errors = errorsProp ?? formState.errors;

  return !!Object.values(errors).length ? (
    <Alert severity="error">
      <>{Object.values(errors)[0]?.message}</>
    </Alert>
  ) : null;
};
