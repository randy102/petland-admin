import { Button, message, Space } from "antd";
import { useForm } from "components/Shared/RForm";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { Dispatch, useState } from "react";
import { useMutation } from "utils/request";
import FormCategory from "./FormCategory";

interface CreateProps extends StdCreateProps {
  refetch: Function;
  setCurTab: Dispatch<string>;
}

export default function CreateCategory(props: CreateProps) {
  const {setCurTab, refetch} = props;

  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const requestCreate = useMutation({api: '/project/category', method: 'post'});

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setLoading(true);
      requestCreate({data: inputs})
        .then(() => {
          message.success("Success!");
          form.resetFields();
          setCurTab('list-cate');
          refetch();
        })
        .catch((error) => message.error(`Error: ${error.response.data}`))
        .finally(() => setLoading(false));
    });
  }

  return (
    <div>
      <FormCategory form={form} />
      <Space>
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </div>
  );
}
