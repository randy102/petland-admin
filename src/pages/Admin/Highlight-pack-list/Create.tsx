import { Button, message, Space } from 'antd';
import { useForm } from 'components/Shared/RForm';
import { StdCreateProps } from 'components/Shared/RForm/types';
import React, { useState } from 'react';
import { handleRequestError, useMutation } from 'utils/request';
import Form from './Form';

interface CreateProps extends StdCreateProps {
  refetch: Function;
}

export default function Create(props: CreateProps) {
  const { setCurTab, refetch } = props;

  const [form] = useForm();

  const [loading, setLoading] = useState(false);

  const requestCreate = useMutation({ api: 'pack', method: 'post' });

  function handleSubmit() {
    form.validateFields().then(inputs => {
      setLoading(true);
      requestCreate({ 
        data: {
          ...inputs,
          dayNumber: inputs?.dayNumber,
          price: inputs?.price,
          }
        })
        .then(() => {
          message.success('Tạo thành công!');
          form.resetFields();
          setCurTab('list');
          refetch();
        })
        .catch(handleRequestError(form))
        .finally(() => setLoading(false));
    });
  }
  return (
    <div>
      <Form form={form} />
      <Space>
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Tạo
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </div>
  );
}
