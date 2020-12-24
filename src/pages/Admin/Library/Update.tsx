import { message } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import RUploadFile from "components/Shared/RForm/RUploadFile";
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

  const [file, setFile] = useState<string>();

  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  useEffect(() => {
    setFile(initRow?.file);
  }, [initRow]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    form.resetFields();
  }

  function handleSubmit(submitFile?: string) {
    form.validateFields().then((inputs) => {
      setSubmitLoading(true);
      requestUpdate({
        api: "/library/" + initRow?._id,
        data: {
          ...inputs,
          file: submitFile !== undefined ? submitFile : file,
        },
        
      })
        .then(() => {
          if (!submitFile && submitFile !== "") {
            handleClose();
            message.success("Success!");
          }
          refetch();
        })
        .catch((error) => message.error(`Error: ${error.response.data}`))
        .finally(() => setSubmitLoading(false));
    });
  }

  function handleImageChange(file: string | undefined) {
    setFile(file);
    handleSubmit(file || "");
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
      <Form form={form} init={initRow} showSequence />
      <RUploadFile
        onChange={handleImageChange}
        label="File"
        initId={initRow?.file}
        initName={initRow?.vi}
      />
    </RDrawer>
  );
}
