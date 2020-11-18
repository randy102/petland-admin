import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect } from "react";

interface FormProps extends StdRFormProps {
  isManufact: boolean;
}

export default function Form(props: FormProps) {
  const { form, init, isManufact = false } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput label="Name" name="name" rules={{ required: true }} />

      <RInput label="Phone" name="phone" rules={{ pattern: /^[0-9()\-\s)]+$/ }} />

      <RInput label="Address" name="address" />

      <RInput label="Email" name="email" rules={{ type: "email" }} />

      <RInput label="Fax" name="fax" />

      <RInput label="Area" name="area" rules={{ required: isManufact }} />

      <RInput
        label="Core Area"
        name="coreArea"
        rules={{ required: isManufact }}
      />

      <RInput
        label="Management system"
        name="managementSystem"
        rules={{ required: isManufact }}
      />

      <RInput
        label="Total wattage"
        name="totalWattage"
        rules={{ required: isManufact }}
      />
    </RForm>
  );
}
