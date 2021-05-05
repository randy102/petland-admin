import RForm from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
import RUpload from 'components/Shared/RForm/RUpload';
import { StdRFormProps } from 'components/Shared/RForm/types';
import React, { useEffect } from 'react';

interface FormProps extends StdRFormProps {
  setImageId?: (id?: string) => void,
  imageId?: string,
  isUpdate?: boolean,
}

export default function Form(props: FormProps) {
  const { 
    form, 
    init,
    setImageId,
    imageId,

  } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);
  console.log(imageId);
  return (
    <RForm form={form} initialValues={init}>
      <RInput 
        label='Tên đối tác' 
        name='partner' 
        rules={{ required: true }} 
      />
      <RUpload
        label="Hình ảnh"
        initId={imageId}    
        onChange={setImageId}
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

