import React from "react";
import { Form, DatePicker } from "antd";
import { Moment } from "moment";

interface RDateProps {
  value?: Moment;
  name: string;
  label: string;
  disabled?: boolean;
  visible?: boolean;
  prefix?: React.ReactNode;
  onChange?: (value: Moment) => void;
}

export default function RDate(props: RDateProps) {
  const {
    value,
    name,
    label,
    disabled = false,
    visible = true,
    prefix,
    onChange = () => {},
  } = props;

  const itemProps = {
    name,
    label,
  };

  const inputProps: any = {
    format: "DD/MM/YYYY",
    prefix,
    disabled,
    value,
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
    onChange: (value: Moment) => {
      onChange(value);
    },
  };

  return visible ? (
    <Form.Item {...itemProps}>
      <DatePicker {...inputProps} />
    </Form.Item>
  ) : (
    <></>
  );
}
