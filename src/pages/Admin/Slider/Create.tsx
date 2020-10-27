import { Button, message, Space } from "antd";
import { useForm } from "components/Shared/RForm";
import RUpload, { UploadApi } from "components/Shared/RForm/RUpload";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { useState } from "react";
import { useMutation } from "utils/request";
import Form from "./Form";

interface CreateProps extends StdCreateProps {
  refetch: Function
}

export default function Create(props: CreateProps) {
  const {setCurTab, refetch} = props;

  const [form] = useForm();
  const [uploadAPI, setUploadAPI] = useState<UploadApi>();
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  
  const requestCreate = useMutation({api: '/slider', method: 'post'});

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setLoading(true);
      requestCreate({data: {
        ...inputs,
        image,
      }})
        .then(() => {
          message.success("Success!");
          form.resetFields();
          setCurTab('list');
          refetch();
          uploadAPI?.reset();
        })
        .catch((error) => message.error(`Error: ${error.response.data}`))
        .finally(() => setLoading(false));
    });
  }


  return (
    <div>
      <Form form={form} />
      <RUpload
        onChange={setImage}
        label="Image"
        cropShape="rect"
        uploadApi={setUploadAPI}
      />
      <Space>
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </div>
  );
}
