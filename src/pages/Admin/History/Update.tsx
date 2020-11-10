import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import RForm, { useForm } from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
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
  const [form] = useForm();

  const [image, setImage] = useState<string>();

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
      setImage(initRow?.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  useEffect(() => {
    form.setFieldsValue(initRow);
  }, [initRow, form]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setImage(undefined);
    enForm.resetFields();
    viForm.resetFields();
  }

  function handleSubmit(submitImage?: string) {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    const formInputs = form.validateFields();

    Promise.all([enInputs, viInputs, formInputs])
      .then(([en, vi, form]) => {
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
          api: "/history/" + initRow?._id,
          data: {
            ...form,
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
      <RForm form={form}>
        <RInput label="Time" number name="time" rules={{ required: true }} />
      </RForm>
      <RUpload
        onChange={handleImageChange}
        label="Image"
        crop={false}
        initId={initRow?.image}
      />
    </RDrawer>
  );
}
