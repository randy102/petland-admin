import React from "react";
import { Form, Select } from "antd";
import { removeAccents } from "utils/string";

interface RSelectProps {
  mode?: "multiple" | "tags";
  disabled?: boolean;
  name: string;
  label: string;
  data: object[];
  prefix?: React.ReactNode;
  showSearch?: boolean;
  placeholder?: string;
  required?: boolean;
  filterProps?: (row: any) => string[];
  onChange?: (value: any) => void;
  onSearch?: (input: string) => void;
  refetch?: () => void;
  optionRender: (row: any) => React.ReactNode;
  optionValue: (row: any) => any;
  labelRender: (row: any) => React.ReactNode;
  validator?: (rule: any, value: any) => Promise<string>;
}

function RSelect(props: RSelectProps) {
  const {
    mode,
    disabled = false,
    required = false,
    name,
    label,
    data = [],
    prefix,
    showSearch,
    placeholder,
    filterProps = () => {},
    onChange = () => {},
    refetch = () => {},
    optionRender = () => <></>,
    optionValue = () => {},
    labelRender = () => {},
    validator,
    onSearch = () => {},
  } = props;

  const itemProps: any = {
    name,
    label,
    rules: [{ required }],
  };

  if (validator !== undefined) itemProps.rules.push({ validator });

  const inputProps = {
    mode,
    prefix,
    disabled,
    placeholder,
    onChange: (val: any) => {
      onChange(val);
    },
    onFocus: () => refetch(),
    key: name,
    showSearch,
    filterOption: (input: string, option: any) => {
      let row = data?.find((r: any) => String(r._id) === option.key);
      let filterArr: any = row && filterProps(row);
      return filterArr?.some(
        (val: string) =>
          removeAccents(val)
            .toLowerCase()
            .indexOf(removeAccents(input).toLowerCase()) >= 0
      );
    },
    optionLabelProp: "label",
    onSearch,
  };

  return (
    <Form.Item {...itemProps}>
      <Select {...inputProps}>
        {data &&
          data.map((row: any) => {
            return (
              <Select.Option
                label={labelRender(row)}
                key={row._id}
                value={optionValue(row)}
              >
                {optionRender(row)}
              </Select.Option>
            );
          })}
      </Select>
    </Form.Item>
  );
}

export default RSelect;
