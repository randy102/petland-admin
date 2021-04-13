import { Button, message } from 'antd';
import RForm, { useForm } from 'components/Shared/RForm';
import RPassword from 'components/Shared/RForm/RPassword';
import React, { useState } from 'react';
import { handleRequestError, useMutation } from 'utils/request';

interface ChangePassProps {
  setShowModal: React.Dispatch<boolean>;
}

export default function ChangePassword(props: ChangePassProps) {
  const { setShowModal } = props;
  const [form] = useForm();
  const requestChangePass = useMutation({
    api: '/user/password',
    method: 'put',
  });
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    form.validateFields().then(inputs => {
      if (inputs.new_password !== inputs.confirm) {
        message.error('Xác nhận mật khẩu mới không đúng!');
        return;
      }
      setLoading(true);
      requestChangePass({
        data: inputs,
      })
        .then(() => {
          message.success('Đổi mật khẩu thành công!');
          form.resetFields();
          setShowModal(false);
        })
        .catch(handleRequestError);
    });
  }
  return (
    <div>
      <RForm form={form}>
        <RPassword
          name="old_password"
          label="Mật khẩu hiện tại"
          rules={{ required: true }}
        />

        <RPassword
          name="new_password"
          label="Mật khẩu mới"
          rules={{ required: true, min: 6 }}
        />

        <RPassword
          name="confirm"
          label="Xác nhận mật khẩu mới"
          rules={{ required: true, min: 6 }}
        />
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          Đổi mật khẩu
        </Button>
      </RForm>
    </div>
  );
}
