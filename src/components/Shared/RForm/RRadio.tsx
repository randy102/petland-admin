import React from "react";
import { Form, Radio } from "antd";
import "./rradio.scss";

interface RRadioProps{
  style?: React.CSSProperties
  disabled?: boolean
  required?: boolean
  name: string
  label: string
  placeholder?: string
  prefix?: React.ReactNode
  data: any[]
  onChange?: (value: any) => void
  optionRender: (row: any) => React.ReactNode
  optionValue: (row: any) => any
}

function RRadio(props: RRadioProps) {
  const {
    style,
    disabled = false,
    required = false,
    name,
    label,
    data = [],
    prefix,
    placeholder,
    onChange = () => {},
    optionRender = () => <></>,
    optionValue = () => {},
  } = props;
  const itemProps = {
    name,
    label,
    rules: [
      {
        required,
      },
    ],
    style,
  };

  const inputProps = {
    prefix,
    disabled,
    placeholder,
    onChange: (e: any) => {
      onChange(e.target.value);
    },
    key: name,
  };

  return (
    <Form.Item {...itemProps}>
      <Radio.Group {...inputProps} style={{ marginTop: 5 }}>
        {data &&
          data.map((row) => {
            return (
              <Radio key={row._id} value={optionValue(row)}>
                {optionRender(row)}
              </Radio>
            );
          })}
      </Radio.Group>
    </Form.Item>
  );
}


export default RRadio;
