import RForm from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
import RUpload from 'components/Shared/RForm/RUpload';
import { StdRFormProps } from 'components/Shared/RForm/types';
import React, { useEffect, useState } from 'react';

interface FormProps extends StdRFormProps {
}

export default function Form(props: FormProps) {
  const { 
    form, 
    init,
  } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);
  const [imageId, setImageId] = useState();

  return (
    <RForm form={form} initialValues={init}>
      <RInput 
        label='Tên đối tác' 
        name='partner' 
        rules={{ required: true }} 
      />
      <RUpload
        label="Hình ảnh"
        initId="default"
        onChange={imageId => setImageId}
      />
      <RInput 
        label='Vị trí' 
        name='position' 
        rules={{ required: true }} 
      />
      <RInput 
        label='Đường dẫn liên kết' 
        name='url' 
        rules={{ required: true }} 
      />
    </RForm>
  );
}

