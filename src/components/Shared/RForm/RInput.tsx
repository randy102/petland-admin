import React from "react";
import { Form, Input, InputNumber } from "antd";
import "./rinput.scss";
import { currencyFormatter } from "utils/string";

export interface RInputProps {
  name: string
  label: string
  rules?: Rules
  disabled?: boolean
  visible?: boolean
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onChange?: Function
  value?: any
  textarea?: boolean
  number?: boolean
  price?: boolean
  autoFocus?: boolean
  style?: React.CSSProperties
  readonly?: boolean
}

export interface Rules {
  max?: number;
  message?: string | React.ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  type?: "url" | "email";
}

export default function RInput(props: RInputProps) {
  const {
    value,
    number = false,
    price = false,
    textarea = false,
    autoFocus = false,
    name,
    label,
    rules,
    disabled = false,
    visible = true,
    placeholder,
    prefix,
    suffix,
    style,
    onChange = () => {},
  } = props;

  const itemProps: any = {
    name,
    label,
    rules: [
      {
        ...rules,
        whitespace: !!rules?.required,
        type: number || price ? "number" : rules?.type,
      },
    ],
  };

  const inputProps: any = {
    style: {
      ...props.style,
      pointerEvents: props.readonly ? 'none' : 'auto'
    },
    prefix,
    suffix,
    disabled,
    placeholder,
    value,
    autoFocus,
    autoComplete: 'on',
    onKeyPress: (e: React.KeyboardEvent) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onPaste: (e: React.ClipboardEvent) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onChange: (e: any) => {
      let value = number || price ? e : e.target.value;
      onChange(value);
    },
  };

  if (price) {
    inputProps.formatter = (value: number | string | undefined) =>
      "đ " + currencyFormatter(value);
    inputProps.parser = (value: string | undefined) =>
      value?.replace(/đ\s?|(,*)/g, "");
  }

  let InputType;
  if (textarea) InputType = Input.TextArea;
  else if (number || price) InputType = InputNumber;
  else InputType = Input;

  return visible ? (
    <Form.Item {...itemProps}>
      <InputType {...inputProps} />
    </Form.Item>
  ) : (
    <></>
  );
}
