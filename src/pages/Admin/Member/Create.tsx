import { Button, message, Space, Tabs } from "antd";
import { useForm } from "components/Shared/RForm";
import RUpload, { UploadApi } from "components/Shared/RForm/RUpload";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { Dispatch, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
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
  const [logo, setLogo] = useState<string>();

  const [uploadAPI, setUploadAPI] = useState<UploadApi>();
  const [lang, setLang] = useState<string>("vi");
  const [saveLoading, setSaveLoading] = useState(false);
  const requestCreate = useMutation({ api: "/member", method: "post" });

  function handleSave() {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    Promise.all([enInputs, viInputs])
      .then(([en, vi]) => {
        setSaveLoading(true);

        let toCreateData = [];
        if (!isEmpty(en)) {
          toCreateData.push({ ...en, lang: "en" });
        }
        if (!isEmpty(vi)) {
          toCreateData.push({ ...vi, lang: "vi" });
        }

        requestCreate({
          data: {
            logo: logo || "",
            data: toCreateData,
          },
        })
          .then(() => {
            message.success("Success!");
            refetch();
            setCurTab("list");
            viForm.resetFields();
            enForm.resetFields();
            uploadAPI?.reset();
          })
          .catch(handleRequestError)
          .finally(() => setSaveLoading(false));
      })
      .catch(handleFieldError);
  }

  function handleCopy() {
    const viData = viForm.getFieldsValue();
    switch (lang) {
      case "en":
        enForm.setFieldsValue(viData);
        return;
    }
  }

  return (
    <>
      <Tabs
        style={{ maxWidth: 900 }}
        type="card"
        activeKey={lang}
        onTabClick={setLang}
        tabBarExtraContent={
          <Space style={{ transform: "translateY(4px)" }}>
            {lang !== "vi" && (
              <Button onClick={handleCopy}>Copy from Vietnamese</Button>
            )}
            <Button loading={saveLoading} onClick={handleSave} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form form={viForm} />
        </Tabs.TabPane>

        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} />
        </Tabs.TabPane>
      </Tabs>
      <RUpload
        onChange={setLogo}
        label="Logo"
        cropShape="rect"
        uploadApi={setUploadAPI}
      />
    </>
  );
}
