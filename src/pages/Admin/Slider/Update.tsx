import { message } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import RUpload from "components/Shared/RForm/RUpload";
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

  const [image, setImage] = useState<string>();

  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  useEffect(() => {
    setImage(initRow?.image);
  }, [initRow]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
  }

  function handleSubmit(submitImage?: string) {
    form.validateFields().then((inputs) => {
      setSubmitLoading(true);
      requestUpdate({
        api: "/slider/" + initRow?._id,
        data: {
          ...inputs,
          image: submitImage !== undefined ? submitImage : image,
        },
        
      })
        .then(() => {
          if (!submitImage && submitImage !== "") {
            handleClose();
            message.success("Success!");
          }
          refetch();
        })
        .catch((error) => message.error(`Error: ${error.response.data}`))
        .finally(() => setSubmitLoading(false));
    });
  }

  function handleImageChange(image: string | undefined) {
    setImage(image);
    handleSubmit(image || "");
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
      <Form form={form} init={initRow} />
      <RUpload
        onChange={handleImageChange}
        label="Image"
        crop={false}
        initId={initRow?.image}
      />
    </RDrawer>
  );
}
