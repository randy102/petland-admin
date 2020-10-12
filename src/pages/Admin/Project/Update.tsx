import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import RUploads from "components/Shared/RForm/RUploads";
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
  const [imgs, setImgs] = useState<string[]>();

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
    setImgs(initRow?.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setEnCK("");
    setViCK("");
    setImgs(undefined);
    enForm.resetFields();
    viForm.resetFields();
  }

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
          api: "/project/" + initRow?._id,
          data: {
            images: submitImgs || imgs,
            data: [enData, viData],
          },
        })
          .then(() => {
            if (!submitImgs) {
              handleClose();
              message.success("Success!");
            }
            refetch();
          })
          .catch(handleRequestError)
          .finally(() => setSubmitLoading(false));
      })
      .catch(handleFieldError);
  }

  function handleImgsChange(imgs: string[]) {
    setImgs(imgs);
    handleSubmit(imgs);
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
            if (lang === "vi") setLang("en");
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
      <RUploads
        onChange={handleImgsChange}
        label="Images"
        initIds={initRow?.images}
      />
    </RDrawer>
  );
}
