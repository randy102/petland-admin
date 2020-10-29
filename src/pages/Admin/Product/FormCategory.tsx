import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSelect from "components/Shared/RForm/RSelect";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect } from "react";
import { CATEGORY_TYPES } from "./CATEGORY_TYPES";

interface FormProps extends StdRFormProps {

}

export default function FormCategory(props: FormProps) {
  const { form, init } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput label="Vi" name="vi" rules={{ required: true }} />
      <RInput label="En" name="en" />
      <RSelect
        label="Type"
        name="type"
        data={CATEGORY_TYPES}
        labelRender={r => r.name}
        optionRender={r => r.name}
        optionValue={r => r._id}
        required
      />
    </RForm>
  );
}
