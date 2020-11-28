import { Button, message, Space } from "antd";
import { useForm } from "components/Shared/RForm";
import RUploadFile, {UploadApi} from "components/Shared/RForm/RUploadFile";
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
  const [file, setFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  
  const requestCreate = useMutation({api: '/library', method: 'post'});

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setLoading(true);
      requestCreate({data: {
        ...inputs,
        file,
      }})
        .then(() => {
          message.success("Success!");
          form.resetFields();
          setCurTab('list');
          refetch();
          uploadAPI?.reset();
        })
        .catch((error) => message.error(`Error: ${error.response?.data}`))
        .finally(() => setLoading(false));
    });
  }

  return (
    <div>
      <Form form={form} />
      <RUploadFile
        onChange={setFile}
        label="File"
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
