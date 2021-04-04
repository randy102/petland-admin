import RForm from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RPassword from "components/Shared/RForm/RPassword";
import RSelect from "components/Shared/RForm/RSelect";
import { StdRFormProps } from "components/Shared/RForm/types";
import React, { useEffect, useState } from "react";
import { getUser, UserRole } from "../../../utils/auth";
import { useFetch, useLazyFetch } from "../../../utils/request";
import { MailOutlined } from "@ant-design/icons";
import RRadio from "../../../components/Shared/RForm/RRadio";
import RSwitch from "../../../components/Shared/RForm/RSwitch";
import RDate from "../../../components/Shared/RForm/RDate";
import RUpload from "../../../components/Shared/RForm/RUpload";
import RUploads from "../../../components/Shared/RForm/RUploads";
import CKEditor from "../../../components/Shared/CKEditor";

interface FormProps extends StdRFormProps {
  isUpdate?: boolean
}

const SELECTIONS = [
  { _id: 1, name: "Chelsea" },
  { _id: 2, name: "Everton" },
  { _id: 3, name: "Man City" },
  { _id: 4, name: "Liverpool" },
  { _id: 5, name: "Tottenham" },
]

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
        prefix={<MailOutlined/>}
        rules={{ type: "email", required: true }}
      />

      <RPassword
        rules={{ required: true }}
        name="password"
        label="Password"/>

      <RInput
        label="Required Text"
        name="required_text"
        rules={{ required: true }}
      />

      <RInput
        number
        label="Number"
        name="number"
      />

      <RInput
        price
        label="Price"
        name="price"
      />

      <RSelect
        data={SELECTIONS}
        label="Selection"
        name="selection"
        labelRender={club => club.name}
        optionRender={club => club.name}
        optionValue={club => club.id}
      />

      <RSelect
        data={SELECTIONS}
        label="Selection with search"
        name="select_search"
        labelRender={club => club.name}
        optionRender={club => club.name}
        optionValue={club => club._id}
        showSearch
        filterProps={club => [club.name]}
      />

      <RSelect
        data={SELECTIONS}
        label="Multiple selection"
        name="select_multi"
        mode="multiple"
        labelRender={club => club.name}
        optionRender={club => club.name}
        optionValue={club => club._id}
        showSearch
        filterProps={club => [club.name]}
      />

      <RRadio
        name="radio"
        label=""
        data={SELECTIONS}
        optionRender={club => club.name}
        optionValue={club => club._id}
      />

      <RSwitch
        name="switch"
        label="Switch"
        checkedText="Checked"
        unCheckedText="Unchecked"
      />

      <RDate
        label="Date"
        name="date"
      />

      <RUpload
        label="Single Upload"
        initId="default"
      />

      <RUploads
        label="Multiple Upload"
      />

      <CKEditor onChange={(val) => console.log(val)}/>
    </RForm>
  );
}
