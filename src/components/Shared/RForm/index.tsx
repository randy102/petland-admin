import React from "react";
import { Form as AntForm } from "antd";
import "./index.scss";
import { FormInstance } from "antd/lib/form";
import { Store } from "antd/lib/form/interface";

export const useForm = AntForm.useForm;

interface RFormProps{
  style?: React.CSSProperties
  children: any
  form?: FormInstance
  initialValues?: Store
  onEnter?: (e: React.KeyboardEvent) => void
}

export default function RForm(props: RFormProps) {
  const { style, children, form, initialValues, onEnter = () => {} } = props;
  return (
    <AntForm
      style={{...style, maxWidth: 900}}
      onKeyPress={(e) => e.key === "Enter" && onEnter(e)}
      form={form}
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
      validateMessages={validateMessages}
    >
      {children}
    </AntForm>
  );
}

const validateMessages = {
  // eslint-disable-next-line
  required: "'${label}' is required!",
  // eslint-disable-next-line
  whitespace: "'${label}' is required!",
  string: {
    // eslint-disable-next-line
    min: "'Minimum of ${label}' must be ${min} symbols",
    // eslint-disable-next-line
    max: "'Maximum of ${label}' must be ${max} symbols",
    // eslint-disable-next-line
    range: "'${label}' length must in range from ${min} to ${max} symbols",
  },
  number: {
    // eslint-disable-next-line
    min: "'${label}' must at least ${min}",
    // eslint-disable-next-line
    max: "'${label}' must greater than ${max}",
    // eslint-disable-next-line
    range: "'${label}' must in range from ${min} to ${max}",
  },
  pattern: {
    // eslint-disable-next-line
    mismatch: "'${label}' invalid",
  },
  types: {
    // eslint-disable-next-line
    integer: "'${label}' must be integer",
    // eslint-disable-next-line
    number: "'${label}' must be number",
    // eslint-disable-next-line
    email: "'${label}' invalid",
    // eslint-disable-next-line
    url: "'${label}' is not a valid URL",
  },
};
