import { message, Tabs } from "antd";
import { POST_STATUS } from "components/Shared/POST_STATUS";
import RDrawer from "components/Shared/RDrawer";
import RForm, { useForm } from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSelect from "components/Shared/RForm/RSelect";
import RSwitch from "components/Shared/RForm/RSwitch";
import RUpload from "components/Shared/RForm/RUpload";
import React, { useEffect, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { getLang } from "utils/languages";
import { handleRequestError, useMutation } from "utils/request";
import Form from "./Form";
import { NEWS_TYPES } from "./NEWS_TYPES";

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
    if (!enForm.isFieldsTouched()) {
      enForm.setFieldsValue(initData["en"]);
      setEnCK(initData["en"]?.content || "");
    }

    if (!viForm.isFieldsTouched()) {
      viForm.setFieldsValue(initData["vi"]);
      setViCK(initData["vi"]?.content || "");
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
    setEnCK("");
    setViCK("");
    setImage(undefined);
    enForm.resetFields();
    viForm.resetFields();
    form.resetFields();
  }

  function handleSubmit(submitImage?: string) {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    const formInputs = form.validateFields();

    Promise.all([enInputs, viInputs, formInputs])
      .then(([en, vi, form]) => {
        setSubmitLoading(true);
        let data = [];

        if (initData["en"].title || enForm.isFieldsTouched())
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
            ...form,
            isPrimary: !!form.isPrimary,
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
      width="100vw"
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
          <Form form={viForm} onChange={setViCK} initCK={viCK} />
        </Tabs.TabPane>
        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} onChange={setEnCK} initCK={enCK} />
        </Tabs.TabPane>
      </Tabs>
      <RForm form={form}>
        <RSwitch
          name="isPrimary"
          label="Primary"
          checkedText="True"
          unCheckedText="False"
        />
        <RSelect
          data={POST_STATUS}
          label="Status"
          name="status"
          labelRender={(row) => row.name}
          optionRender={(row) => row.name}
          optionValue={(row) => row._id}
          required
        />
        <RSelect
          label="Type"
          name="type"
          data={NEWS_TYPES}
          labelRender={(r) => r.name}
          optionRender={(r) => r.name}
          optionValue={(r) => r._id}
          required
        />
        <RInput
          name="sequence"
          label="Sequence"
          number
          rules={{ required: true }}
        />
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
