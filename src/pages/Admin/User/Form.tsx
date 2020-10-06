import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RPassword from "components/Shared/RForm/RPassword";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect } from "react";

interface FormProps extends StdRFormProps {
  requirePassword?: boolean;
}

export default function Form(props: FormProps) {
  const { form, init, requirePassword = true } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput
        label="Username"
        name="username"
        rules={{ min: 5, required: true }}
      />

      <RInput
        label="Email"
        name="email"
        rules={{ type: "email", required: true }}
      />

      <RPassword
        label="Password"
        name="password"
        rules={{ min: 6, required: requirePassword }}
      />

      <RInput label="Last name" name="lastName" />

      <RInput label="First name" name="firstName" />
    </RForm>
  );
}
