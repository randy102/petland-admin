import { message, Spin } from 'antd';
import RDrawer from 'components/Shared/RDrawer';
import { useForm } from 'components/Shared/RForm';
import React, { useState } from 'react';
import { handleRequestError, useFetch, useMutation } from 'utils/request';
import Form from './Form';

interface UpdateProps {
  setInitRow: React.Dispatch<any>;
  setShowForm: React.Dispatch<boolean>;
  initRow: any;
  refetch: Function;
  showForm: boolean;
}

export default function Update(props: UpdateProps) {
  const { setInitRow, setShowForm, initRow, refetch, showForm } = props;

  const [submitLoading, setSubmitLoading] = useState(false);

  const requestUpdate = useMutation({ method: 'put', api: 'sub-category' });

  const [categoriesRes, { loading: loadingCategories }] = useFetch({
    api: 'category',
    method: 'get',
  });

  const [form] = useForm();

  function handleSubmit() {
    form.validateFields().then(inputs => {
      setSubmitLoading(true);
      requestUpdate({
        data: {
          id: initRow?._id,
          categoryID: initRow?.categoryID,
          newName: inputs.name,
        },
      })
        .then(() => {
          message.success('Chỉnh sửa thành công!');
          refetch();
          handleClose();
        })
        .catch(handleRequestError)
        .finally(() => setSubmitLoading(false));
    });
  }

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
  }

  return (
    <RDrawer
      title="Chỉnh sửa"
      onClose={handleClose}
      visible={showForm}
      footDef={[
        {
          name: 'Lưu',
          type: 'primary',
          onClick: handleSubmit,
          loading: submitLoading,
        },
        {
          name: 'Hủy',
          onClick: handleClose,
        },
      ]}
    >
      {loadingCategories ? (
        <Spin />
      ) : (
        <Form
          form={form}
          init={initRow}
          categories={categoriesRes?.data || []}
          isUpdate
        />
      )}
    </RDrawer>
  );
}
