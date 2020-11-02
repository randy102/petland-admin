import { Button, message, Space } from "antd";
import { useForm } from "components/Shared/RForm";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { useEffect, useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import Form from "./Form";
import { TEMPLATE_FIELDS } from "./TEMPLATE_FIELDS";

interface CreateProps extends StdCreateProps {
  refetch: Function
}

export default function Create(props: CreateProps) {
  const {setCurTab, refetch} = props;

  const [form] = useForm();
  const [ck, setCK] = useState<string>();
  const [loading, setLoading] = useState(false);
  
  const requestCreate = useMutation({api: '/mailtemplate', method: 'post'});

  useEffect(() => {
    if(!form.isFieldsTouched()){
      form.setFieldsValue({fields: TEMPLATE_FIELDS.map(r => r._id)})
    }
  },[form])

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setLoading(true);
      requestCreate({data: {
        ...inputs,
        content: ck
      }})
        .then(() => {
          message.success("Success!");
          form.resetFields();
          form.setFieldsValue({fields: TEMPLATE_FIELDS.map(r => r._id)})
          setCurTab('list');
          setCK("");
          refetch();
        })
        .catch(handleRequestError)
        .finally(() => setLoading(false));
    });
  }


  return (
    <div>
      <Form form={form} onChange={setCK} initCK={ck} />
      <Space>
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </div>
  );
}
