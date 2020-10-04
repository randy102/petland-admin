import React from "react";
import { Form, Switch as AntSwitch } from "antd";

interface RSwitchProps {
  name: string;
  label: string;
  value?: boolean;
  checkedText: string;
  unCheckedText: string;
  onChange?: (value: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
}

function Switch(props: Partial<RSwitchProps>) {
  const modifiedProps = {
    ...props,
    checked: props.value,
  };
  return <AntSwitch {...modifiedProps} />;
}

export default function RSwitch(props: RSwitchProps) {
  const {
    name,
    label,
    value,
    checkedText,
    unCheckedText,
    onChange,
    visible = true,
    disabled = false,
  } = props;

  const itemProps = {
    name,
    label,
  };

  const switchProps = {
    checkedChildren: checkedText,
    unCheckedChildren: unCheckedText,
    onChange,
    disabled,
    value,
  };
  return visible ? (
    <Form.Item {...itemProps}>
      <Switch {...switchProps} />
    </Form.Item>
  ) : (
    <></>
  );
}
