import React from "react";
import { Form, Input } from "antd";
import { RInputProps } from "./RInput";

export default function RPassword(props: RInputProps) {
  const {
    name,
    label,
    rules,
    disabled = false,
    visible = true,
    prefix,
    placeholder,
    onChange = () => {},
  } = props;

  const itemProps = {
    name,
    label,
    rules: [
      {
        ...rules,
        whitespace: !!rules?.required,
      },
    ],
  };

  const inputProps = {
    prefix,
    disabled,
    placeholder,
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
      onChange(e.target.value);
    },
  };

  return visible ? (
    <Form.Item {...itemProps}>
      <Input.Password {...inputProps} />
    </Form.Item>
  ) : (
    <></>
  );
}
