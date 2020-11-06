import { Button, message, Skeleton, Space, Tabs } from "antd";
import { useForm } from "components/Shared/RForm";
import React, { useEffect, useState } from "react";
import { handleRequestError, useFetch, useMutation } from "utils/request";
import Form from "./Form";

export default function Translation() {
  const [res, { loading, refetch }] = useFetch({ api: "/i18n" });
  const [saveLoading, setSaveLoading] = useState(false);
  const requestSave = useMutation({ api: "/i18n", method: "post" });

  const [curTab, setCurTab] = useState("vi");
  const [enForm] = useForm();
  const [viForm] = useForm();

  useEffect(() => {
    const enData = res?.data.find((i18n: any) => i18n.lang === "en");
    const viData = res?.data.find((i18n: any) => i18n.lang === "vi");
    enForm.setFieldsValue({ en: enData?.data });
    viForm.setFieldsValue({ vi: viData?.data });
  }, [res, enForm, viForm]);

  async function handleSave() {
    const enInputs = await enForm.validateFields();
    const viInputs = await viForm.validateFields();
    const enData = res?.data.find((i18n: any) => i18n.lang === "en");

    setSaveLoading(true);

    const upsertEn = requestSave({
      data: {
        lang: "en",
        data: enInputs.en || enData?.data,
      },
    }).catch(handleRequestError);
    
    const upsertVi = requestSave({
      data: {
        lang: "vi",
        data: viInputs.vi || [],
      },
    }).catch(handleRequestError);

    Promise.all([upsertEn, upsertVi]).then(() => {
      setSaveLoading(false);
      message.success("Success!");
      refetch();
    });
  }

  function handleCopy() {
    const viData = viForm.getFieldsValue()
    switch(curTab){
      case 'en':
        enForm.setFieldsValue({en: viData.vi});
        return;
    }
  }

  if (loading) return <Skeleton active />;

  return (
    <Tabs
      style={{ maxWidth: 900 }}
      tabBarExtraContent={
        <Space style={{ transform: "translateY(7px)" }}>
          <Button onClick={handleCopy}>
            Copy from {curTab === "vi" ? "English" : "Vietnamese"}
          </Button>
          <Button loading={saveLoading} onClick={handleSave} type="primary">
            Save
          </Button>
        </Space>
      }
      activeKey={curTab}
      onTabClick={(key) => setCurTab(key)}
    >
      <Tabs.TabPane key="vi" tab="Vietnamese">
        <Form name="vi" form={viForm} />
      </Tabs.TabPane>
      <Tabs.TabPane key="en" tab="English">
        <Form name="en" form={enForm} />
      </Tabs.TabPane>
    </Tabs>
  );
}
