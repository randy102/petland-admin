import RForm from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
import { StdRFormProps } from 'components/Shared/RForm/types';
import React, { useEffect } from 'react';

interface FormProps extends StdRFormProps {}

export default function Form(props: FormProps) {
  const { form, init } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput label="Name" name="name" rules={{ required: true }} />
    </RForm>
  );
}
