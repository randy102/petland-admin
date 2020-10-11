import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import React, { useEffect, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { getLang } from "utils/languages";
import { handleRequestError, useMutation } from "utils/request";
import Form from "./Form";

interface UpdateProps {
  setInitRow: React.Dispatch<any>;
  setShowForm: React.Dispatch<boolean>;
  initRow: any;
  refetch: Function;
  showForm: boolean;
  lang: string;
  setLang: React.Dispatch<string>;
}

export default function Update(props: UpdateProps) {
  const {
    setInitRow,
    setShowForm,
    initRow,
    refetch,
    showForm,
    lang,
    setLang,
  } = props;

  const [enForm] = useForm();
  const [viForm] = useForm();
  const [enCK, setEnCK] = useState<string>();
  const [viCK, setViCK] = useState<string>();

  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  const initData: any = {
    vi: getLang("vi", initRow),
    en: getLang("en", initRow),
  };

  useEffect(() => {
    enForm.setFieldsValue(initData["en"]);
    viForm.setFieldsValue(initData["vi"]);
    setEnCK(initData["en"]?.content || "");
    setViCK(initData["vi"]?.content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setEnCK("");
    setViCK("");
    enForm.resetFields();
    viForm.resetFields();
  }

  function handleSubmit() {
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
          api: "/news/" + initRow?._id,
          data: {
            data: [enData, viData],
          },
        })
          .then(() => {
            handleClose();
            message.success("Success!");
            refetch();
          })
          .catch(handleRequestError)
          .finally(() => setSubmitLoading(false));
      })
      .catch(handleFieldError);
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
            if(lang==='vi') setLang('en');
            setTimeout(() => handleSubmit());
          },
          loading: submitLoading,
        },
        {
          name: "Close",
          onClick: handleClose,
        },
      ]}
    >
      <Tabs type="card" activeKey={lang} onTabClick={setLang}>
        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form form={viForm} onChange={setViCK} initCK={viCK} />
        </Tabs.TabPane>
        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} onChange={setEnCK} initCK={enCK} />
        </Tabs.TabPane>
      </Tabs>
    </RDrawer>
  );
}
