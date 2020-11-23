import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSelect from "components/Shared/RForm/RSelect";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect } from "react";
import { SLIDER_TYPES } from "./SLIDER_TYPES";

interface FormProps extends StdRFormProps {
}

export default function Form(props: FormProps) {
  const { form, init } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput label="Title (Vi)" name="vi" rules={{ required: true }} />
      <RInput label="Title (En)" name="en" />

      <RInput label="Link" name="link" />

      <RInput label="Extra link" name="extraLink" />

      <RSelect
        label="Type"
        name="type"
        data={SLIDER_TYPES}
        labelRender={r => r.name}
        optionRender={r => r.name}
        optionValue={r => r._id}
        required
      />
    </RForm>
  );
}
