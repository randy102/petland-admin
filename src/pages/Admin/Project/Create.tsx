import { Button, message, Tabs } from "antd";
import { useForm } from "components/Shared/RForm";
import RUploads from "components/Shared/RForm/RUploads";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { Dispatch, useState } from "react";
import { handleFieldError } from "utils/form";
import { handleRequestError, useMutation } from "utils/request";
import Form from "./Form";

interface CreateProps extends StdCreateProps {
  refetch: Function;
  setCurTab: Dispatch<string>;
}

export default function Create(props: CreateProps) {
  const { setCurTab, refetch } = props;

  const [enForm] = useForm();
  const [viForm] = useForm();
  const [enCK, setEnCK] = useState<any>();
  const [viCK, setViCK] = useState<any>();
  const [imgs, setImgs] = useState<string[]>();

  const [saveLoading, setSaveLoading] = useState(false);
  const requestCreate = useMutation({ api: "/project", method: "post" });

  async function handleSave() {
    try {
      const enInputs = await enForm.validateFields();
      const viInputs = await viForm.validateFields();

      setSaveLoading(true);

      requestCreate({
        data: {
          images: imgs,
          data: [
            {
              ...enInputs,
              content: enCK,
              lang: "en",
            },
            {
              ...viInputs,
              content: viCK,
              lang: "vi",
            },
          ],
        },
      })
        .then(() => {
          message.success("Success!");
          refetch();
          setCurTab("list");
          viForm.resetFields();
          enForm.resetFields();
          setEnCK("");
          setViCK("");
        })
        .catch(handleRequestError)
        .finally(() => setSaveLoading(false));
    } catch (err) {handleFieldError(err)}
  }

  return (
    <>
      <Tabs
        style={{ maxWidth: 600 }}
        type="card"
        tabBarExtraContent={
          <Button
            style={{ transform: "translateY(4px)" }}
            loading={saveLoading}
            onClick={handleSave}
            type="primary"
          >
            Save
          </Button>
        }
      >
        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} onChange={setEnCK} initCK={enCK} />
        </Tabs.TabPane>

        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form form={viForm} onChange={setViCK} initCK={viCK} />
        </Tabs.TabPane>
      </Tabs>
      <RUploads onChange={setImgs} label="Images" />
    </>
  );
}
