import RForm from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
import RPassword from 'components/Shared/RForm/RPassword';
import RSelect from 'components/Shared/RForm/RSelect';
import { StdRFormProps } from 'components/Shared/RForm/types';
import React, { useEffect } from 'react';
import { getUser, UserRole } from '../../../utils/auth';

interface FormProps extends StdRFormProps {
  isUpdate?: boolean;
}

const ROLES = Object.keys(UserRole).map(role => ({ name: role }));

export default function Form(props: FormProps) {
  const { form, init, isUpdate = false } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput
        label="Email"
        name="email"
        disabled={isUpdate}
        rules={{ type: 'email', required: true }}
      />

      <RPassword
        rules={{ required: true }}
        name="password"
        label="Password"
        visible={!isUpdate}
      />

      <RInput
        label="Tên"
        name="name"
        disabled={isUpdate}
        rules={{ required: true }}
      />

      <RInput
        label="Điện thoại"
        name="phone"
        disabled={isUpdate}
        rules={{ required: true }}
      />

      <RSelect
        data={ROLES}
        label="Vai trò"
        name="role"
        labelRender={role => role.name}
        optionRender={role => role.name}
        optionValue={role => role.name}
        required
        disabled={
          !isUpdate ||
          // As a SubUser, not able to change roles
          getUser('role') === UserRole.MOD ||
          // As an Admin, not able to change it's own role
          init?.email === getUser('email')
        }
      />
    </RForm>
  );
}
