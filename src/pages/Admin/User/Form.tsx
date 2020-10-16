import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RPassword from "components/Shared/RForm/RPassword";
import RSelect from "components/Shared/RForm/RSelect";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect } from "react";

interface FormProps extends StdRFormProps {
  requirePassword?: boolean;
  roleDisabled?: boolean;
  usernameDisabled?: boolean;
}

const ROLES = [
  {name: 'Admin'},
  {name: 'SubUser'}
]

export default function Form(props: FormProps) {
  const { form, init, requirePassword = true, roleDisabled = false, usernameDisabled = false } = props; 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput
        label="Username"
        name="username"
        rules={{ min: 5, required: true }}
        disabled={usernameDisabled}
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

      <RSelect
        data={ROLES}
        label="Role"
        name="roleName"
        labelRender={role => role.name}
        optionRender={role => role.name}
        optionValue={role => role.name}
        required
        disabled={roleDisabled}
      />

      <RInput label="Last name" name="lastName" />

      <RInput label="First name" name="firstName" />
    </RForm>
  );
}
