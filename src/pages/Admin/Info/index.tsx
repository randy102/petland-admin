import { Button, message, Skeleton, Space, Tabs } from "antd";
import { useForm } from "components/Shared/RForm";
import RUploads from "components/Shared/RForm/RUploads";
import React, { useEffect, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { getLang } from "utils/languages";
import { handleRequestError, useFetch, useMutation } from "utils/request";
import Form from "./Form";

export default function Info() {
  const [res, { loading, refetch }] = useFetch({ api: "/info" });
  const [enForm] = useForm();
  const [viForm] = useForm();

  const [enCK, setEnCK] = useState<string>();
  const [viCK, setViCK] = useState<string>();
  const [lang, setLang] = useState<string>("vi");
  const [imgs, setImgs] = useState<string[]>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "post" });

  const initData: any = {
    vi: getLang("vi", res?.data),
    en: getLang("en", res?.data),
  };

  useEffect(() => {
    setImgs(res?.data?.images);
    setEnCK(initData["en"]?.content || "");
    setViCK(initData["vi"]?.content || "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[res])

  useEffect(() => {
    const enInit = enForm.getFieldsValue().name
    const viInit = viForm.getFieldsValue().name
    if(!viInit) viForm.setFieldsValue(getLang("vi", res?.data));
    if(!enInit) enForm.setFieldsValue(getLang("en", res?.data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, lang, enForm, viForm]);

  function handleSubmit(submitImgs?: string[]) {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();

    Promise.all([enInputs, viInputs])
      .then(([en, vi]) => {
        setSubmitLoading(true);
        const enData = {
          lang: "en",
          content: enCK,
          ...(isEmpty(en) ? initData["en"] : en),
        };
        const viData = {
          lang: "vi",
          content: viCK,
          ...(isEmpty(vi) ? initData["vi"] : vi),
        };
        requestUpdate({
          api: "/info",
          data: {
            images: submitImgs || imgs,
            data: [enData, viData],
          },
        })
          .then(() => {
            if(!submitImgs){
              message.success("Success!");
              refetch();
            }
          })
          .catch(handleRequestError)
          .finally(() => setSubmitLoading(false));
      })
      .catch(handleFieldError);
  }

  function handleCopy() {
    const viData = viForm.getFieldsValue()
    switch(lang){
      case 'en':
        setEnCK(viCK);
        enForm.setFieldsValue(viData);
        return;
    }
  }

  function handleImgsChange(imgs: string[]) {
    setImgs(imgs);
    handleSubmit(imgs);
  }
  
  if (loading) return <Skeleton active />;

  return (
    <>
      <Tabs
        style={{ maxWidth: 900 }}
        tabBarExtraContent={
          <Space style={{ transform: "translateY(7px)" }}>
            {lang !== "vi" && (
              <Button onClick={handleCopy}>Copy from Vietnamese</Button>
            )}
            <Button
              loading={submitLoading}
              onClick={() => handleSubmit()}
              type="primary"
            >
              Save
            </Button>
          </Space>
        }
        activeKey={lang}
        onTabClick={setLang}
      >
        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form onChange={setViCK} initCK={viCK} form={viForm} />
        </Tabs.TabPane>
        <Tabs.TabPane key="en" tab="English">
          <Form onChange={setEnCK} initCK={enCK} form={enForm} />
        </Tabs.TabPane>
      </Tabs>
      <RUploads initIds={res?.data?.images} onChange={handleImgsChange} label="Images" />
    </>
  );
}
