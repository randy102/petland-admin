import { Button, message, Space, Tabs } from "antd";
import RForm, { useForm } from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSwitch from "components/Shared/RForm/RSwitch";
import RUploads, { UploadApi } from "components/Shared/RForm/RUploads";
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
  const [form] = useForm();

  const [imgs, setImgs] = useState<string[]>();
  const [manufact, setManufact] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("vi");
  const [uploadAPI, setUploadAPI] = useState<UploadApi>();
  const [saveLoading, setSaveLoading] = useState(false);
  const requestCreate = useMutation({ api: "/contact", method: "post" });

  function handleSave() {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    const formInputs = form.validateFields();
    Promise.all([enInputs, viInputs, formInputs])
      .then(([en, vi, form]) => {
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
            ...form,
            images: imgs || [],
            map: form.map,
            isPrimary: !!form.isPrimary,
            isManufactory: !!form.isManufactory,
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
            setManufact(false);
          })
          .catch(handleRequestError)
          .finally(() => setSaveLoading(false));
      })
      .catch(handleFieldError);
  }

  function handleCopy() {
    const viData = viForm.getFieldsValue()
    switch(lang){
      case 'en':
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
          <Form form={viForm} isManufact={manufact} />
        </Tabs.TabPane>

        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} isManufact={manufact} />
        </Tabs.TabPane>
      </Tabs>
      <RForm form={form}>
        <RSwitch
          name="isPrimary"
          label="Primary"
          checkedText="True"
          unCheckedText="False"
        />
        <RSwitch
          name="isManufactory"
          label="Manufactory"
          onChange={setManufact}
          checkedText="True"
          unCheckedText="False"
        />
        <RInput name="seq" label="Sequence" number rules={{required: true}}/>
        <RInput name="map" label="Map" />
      </RForm>
      <RUploads onChange={setImgs} label="Images" uploadApi={setUploadAPI} />
    </>
  );
}
