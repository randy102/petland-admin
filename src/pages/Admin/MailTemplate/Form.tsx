import CKEditor from "components/Shared/CKEditor";
import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSelect from "components/Shared/RForm/RSelect";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect } from "react";
import { TEMPLATE_FIELDS } from "./TEMPLATE_FIELDS";

interface FormProps extends StdRFormProps {
  onChange: (value: string) => void
  initCK?: string
}

export default function Form(props: FormProps) {
  const { form, init, onChange, initCK } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput label="Name" name="name" rules={{ required: true }} />

      <RInput label="Description" name="description" />

      <RSelect
        label="Fields"
        name="fields"
        labelRender={r => r._id}
        optionRender={r => r._id}
        optionValue={r => r._id}
        data={TEMPLATE_FIELDS}
        mode="tags"
      />

      <label>Content</label>
      <CKEditor init={initCK} onChange={onChange}/>
    </RForm>
  );
}
