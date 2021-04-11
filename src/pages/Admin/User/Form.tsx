import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RPassword from "components/Shared/RForm/RPassword";
import RSelect from "components/Shared/RForm/RSelect";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect, useState } from "react";
import { getUser, UserRole } from "../../../utils/auth";
import { useFetch, useLazyFetch } from "../../../utils/request";

interface FormProps extends StdRFormProps {
  isUpdate?: boolean
}

const ROLES = Object.keys(UserRole).map(role => ({ name: role }))

export default function Form(props: FormProps) {
  const { form, init, isUpdate = false } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form?.resetFields(), [init]);

  return (
    <RForm form={form} initialValues={init}>
      <RInput
        label="Email"
        name="email"
        disabled={isUpdate}
        rules={{ type: "email", required: true }}
      />

      <RPassword rules={{required: true}} name="password" label="Password" visible={!isUpdate}/>

      <RInput
        label="Name"
        name="name"
        disabled={isUpdate}
        rules={{required: true}}
      />

      <RInput
        label="Phone"
        name="phone"
        disabled={isUpdate}
        rules={{required: true}}
      />

      <RSelect
        data={ROLES}
        label="Role"
        name="role"
        labelRender={role => role.name}
        optionRender={role => role.name}
        optionValue={role => role.name}
        required
        disabled={
          isUpdate && (
            // As a SubUser, not able to change roles
            getUser("role") === UserRole.MOD ||
            // As a Admin, not able to change it's own role
            init?.email === getUser("email")
          )
        }
      />
    </RForm>
  );
}
