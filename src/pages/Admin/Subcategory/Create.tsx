import { Button, message, Space, Spin } from 'antd';
import { useForm } from 'components/Shared/RForm';
import { StdCreateProps } from 'components/Shared/RForm/types';
import React, { useState } from 'react';
import { handleRequestError, useFetch, useMutation } from 'utils/request';
import Form from './Form';

interface CreateProps extends StdCreateProps {
  refetch: Function;
}

export default function Create(props: CreateProps) {
  const { setCurTab, refetch } = props;

  const [form] = useForm();

  const [loading, setLoading] = useState(false);

  const requestCreate = useMutation({ api: 'sub-category', method: 'post' });

  const [categoriesRes, { loading: loadingCategories }] = useFetch({
    api: 'category',
    method: 'get',
  });

  function handleSubmit() {
    form.validateFields().then(inputs => {
      setLoading(true);
      requestCreate({ data: inputs })
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

  if (loadingCategories) {
    return <Spin />;
  }

  return (
    <div>
      <Form form={form} categories={categoriesRes?.data || []} />
      <Space>
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          Tạo
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </div>
  );
}
