import RForm from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
import RSelect from 'components/Shared/RForm/RSelect';
import { StdRFormProps } from 'components/Shared/RForm/types';
import React, { useEffect } from 'react';

interface FormProps extends StdRFormProps {
  isUpdate?: boolean;
  categories: any[];
}

export default function Form(props: FormProps) {
  const { form, init, isUpdate } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput label="Tên" name="name" rules={{ required: true }} />

      <RSelect
        data={props.categories}
        label="Thể loại"
        name="categoryID"
        labelRender={category => category.name}
        optionValue={category => category._id}
        optionRender={category => category.name}
        required
        disabled={isUpdate}
      />
    </RForm>
  );
}
