import { message } from 'antd';
import RDrawer from 'components/Shared/RDrawer';
import { useForm } from 'components/Shared/RForm';
import React, { useState } from 'react';
import { handleRequestError, useMutation } from 'utils/request';
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

  const requestUpdate = useMutation({ method: 'put', api: 'category' });

  const [form] = useForm();

  function handleSubmit() {
    form.validateFields().then(inputs => {
      setSubmitLoading(true);
      requestUpdate({
        data: {
          id: initRow?._id,
          newName: inputs.name,
        },
      })
        .then(() => {
          message.success('Success!');
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
      title="Edit"
      onClose={handleClose}
      visible={showForm}
      footDef={[
        {
          name: 'Save',
          type: 'primary',
          onClick: handleSubmit,
          loading: submitLoading,
        },
        {
          name: 'Close',
          onClick: handleClose,
        },
      ]}
    >
      <Form form={form} init={initRow} />
    </RDrawer>
  );
}
