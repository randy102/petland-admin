import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import RUpload from "components/Shared/RForm/RUpload";
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

  const [logo, setLogo] = useState<string>();

  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  const initData: any = {
    vi: getLang("vi", initRow),
    en: getLang("en", initRow),
  };

  useEffect(() => {
    if (!enForm.isFieldsTouched()) enForm.setFieldsValue(initData["en"]);
    if (!viForm.isFieldsTouched()) {
      viForm.setFieldsValue(initData["vi"]);
      setLogo(initRow?.logo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setLogo(undefined);
    enForm.resetFields();
    viForm.resetFields();
  }

  function handleSubmit(submitLogo?: string) {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();

    Promise.all([enInputs, viInputs])
      .then(([en, vi]) => {
        setSubmitLoading(true);

        let data = [];

        if (initData["en"].name || enForm.isFieldsTouched())
          data.push({
            lang: "en",
            ...(isEmpty(en) ? initData["en"] : en),
          });

        data.push({
          lang: "vi",
          ...(isEmpty(vi) ? initData["vi"] : vi),
        });

        requestUpdate({
          api: "/partner/" + initRow?._id,
          data: {
            logo: submitLogo !== undefined ? submitLogo : logo,
            data,
          },
        })
          .then(() => {
            if (!submitLogo && submitLogo !== "") {
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

  function handleLogoChange(logo: string | undefined) {
    setLogo(logo);
    handleSubmit(logo || "");
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
      <Tabs type="card" activeKey={lang} onTabClick={setLang}>
        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form form={viForm} />
        </Tabs.TabPane>
        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} />
        </Tabs.TabPane>
      </Tabs>
      <RUpload
        onChange={handleLogoChange}
        label="Logo"
        cropShape="rect"
        initId={initRow?.logo}
      />
    </RDrawer>
  );
}
