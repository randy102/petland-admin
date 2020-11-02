import { message } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import React, { useEffect, useState } from "react";
import { useMutation } from "utils/request";
import Form from "./Form";

interface UpdateProps {
  setInitRow: React.Dispatch<any>;
  setShowForm: React.Dispatch<boolean>;
  initRow: any;
  refetch: Function;
  showForm: boolean;
}

export default function Update(props: UpdateProps) {
  const { setInitRow, setShowForm, initRow, refetch, showForm } = props;

  const [form] = useForm();

  const [ck, setCK] = useState<string>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });


  useEffect(() => {
    form.setFieldsValue(initRow);
    setCK(initRow?.content || "");
  }, [initRow, form]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setCK("");
  }

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setSubmitLoading(true);
      requestUpdate({
        api: "/mailtemplate/" + initRow?._id,
        data: {
          ...inputs,
          content: ck
        },
      })
        .then(() => {
          handleClose();
          message.success("Success!");
          refetch();
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
      <Form form={form} onChange={setCK} initCK={ck} />
    </RDrawer>
  );
}
