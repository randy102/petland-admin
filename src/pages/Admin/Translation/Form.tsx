import React from "react";
import { Form as AndForm, Input, Button, Space, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

interface FormProps {
  form: FormInstance;
  name: string;
}

export default function Form(props: FormProps) {
  const { form, name } = props;

  return (
    <AndForm autoComplete="off" form={form}>
      <AndForm.List name={name}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="start"
                >
                  <AndForm.Item
                    {...field}
                    name={[field.name, "key"]}
                    fieldKey={[field.fieldKey, "key"]}
                    rules={[{ required: true, message: "Missing key" }]}
                  >
                    <Input placeholder="Key" />
                  </AndForm.Item>
                  <AndForm.Item
                    {...field}
                    name={[field.name, "value"]}
                    fieldKey={[field.fieldKey, "value"]}
                    rules={[{ required: true, message: "Missing value" }]}
                  >
                    <Input placeholder="Value" />
                  </AndForm.Item>
                  <Button danger icon={<MinusCircleOutlined/>} onClick={() => {
                    Modal.confirm({
                      title: "Are you sure?",
                      onOk: () => remove(field.name)
                    })
                  }}
                  />
                </Space>
              ))}

              <AndForm.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </AndForm.Item>
            </div>
          );
        }}
      </AndForm.List>
    </AndForm>
  );
}
