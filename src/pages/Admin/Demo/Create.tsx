import { Button, message, Space } from "antd";
import { useForm } from "components/Shared/RForm";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import Form from "./Form";

interface CreateProps extends StdCreateProps {
  refetch: Function
}

export default function Create(props: CreateProps) {
  const { setCurTab, refetch } = props;

  const [form] = useForm();

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      message.success("Success!");
      console.log(inputs)
    });
  }

  return (
    <div>
      <Form form={form}/>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </div>
  );
}
