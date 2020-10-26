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
  const [enCK, setEnCK] = useState<string>();
  const [viCK, setViCK] = useState<string>();

  const [image, setImage] = useState<string>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  const initData: any = {
    vi: getLang("vi", initRow),
    en: getLang("en", initRow),
  };

  useEffect(() => {
    if (!enForm.isFieldsTouched()){
      enForm.setFieldsValue(initData["en"]);
      setEnCK(initData["en"]?.content || "");
    }

    if (!viForm.isFieldsTouched()){
      viForm.setFieldsValue(initData["vi"]);
      setViCK(initData["vi"]?.content || "");
      setImage(initRow?.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setEnCK("");
    setViCK("");
    setImage(undefined);
    enForm.resetFields();
    viForm.resetFields();
  }

  function handleSubmit(submitImage?: string) {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    Promise.all([enInputs, viInputs])
      .then(([en, vi]) => {
        setSubmitLoading(true);
        let data = [];

        if (initData["en"].name || enForm.isFieldsTouched())
          data.push({
            lang: "en",
            content: enCK,
            ...(isEmpty(en) ? initData["en"] : en),
          });

        data.push({
          lang: "vi",
          content: viCK,
          ...(isEmpty(vi) ? initData["vi"] : vi),
        });

        requestUpdate({
          api: "/news/" + initRow?._id,
          data: {
            image: submitImage !== undefined ? submitImage : image,
            data,
          },
        })
          .then(() => {
            if (!submitImage && submitImage !== "") {
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
            handleSubmit()
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
      <RUpload
        onChange={handleImageChange}
        label="Image"
        cropShape="rect"
        initId={initRow?.image}
      />
    </RDrawer>
  );
}
