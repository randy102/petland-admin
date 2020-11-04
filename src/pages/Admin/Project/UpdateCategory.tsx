import { message } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import React, { useState } from "react";
import { useMutation } from "utils/request";
import FormCategory from "./FormCategory";


interface UpdateProps {
  setInitRow: React.Dispatch<any>;
  setShowForm: React.Dispatch<boolean>;
  initRow: any;
  refetch: Function;
  showForm: boolean;
}

export default function UpdateCategory(props: UpdateProps) {
  const { setInitRow, setShowForm, initRow, refetch, showForm } = props;

  const [form] = useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
  }

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setSubmitLoading(true);
      requestUpdate({
        api: "/project/category/" + initRow?._id,
        data: inputs,
      })
        .then(() => {
          message.success("Success!");
          refetch();
          handleClose();
        })
        .catch((error) => message.error(`Error: ${error.response.data}`))
        .finally(() => setSubmitLoading(false));
    });
  }

  return (
    <RDrawer
      title="Edit"
      onClose={handleClose}
      visible={showForm}
      footDef={[
        {
          name: "Save",
          type: "primary",
          onClick: () => {
            handleSubmit();
          },
          loading: submitLoading,
        },
        {
          name: "Close",
          onClick: handleClose,
        },
      ]}
    >
      <FormCategory
          form={form}
          init={initRow}
          disableType
        />
    </RDrawer>
  );
}
