import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import RForm, { useForm } from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSwitch from "components/Shared/RForm/RSwitch";
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
  const [form] = useForm();

  const [imgs, setImgs] = useState<string[]>();
  const [manufact, setManufact] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  const initData: any = {
    vi: getLang("vi", initRow),
    en: getLang("en", initRow),
  };

  useEffect(() => {
    setManufact(initRow?.isManufactory);
  },[initRow])

  useEffect(() => {
    form.setFieldsValue(initRow);
  },[initRow,form])

  useEffect(() => {
    enForm.setFieldsValue(initData["en"]);
    viForm.setFieldsValue(initData["vi"]);
    setImgs(initRow?.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setImgs(undefined);
    enForm.resetFields();
    viForm.resetFields();
    setManufact(false);
  }

  function handleSubmit(submitImgs?: string[]) {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    const formInputs = form.validateFields();

    Promise.all([enInputs, viInputs, formInputs])
      .then(([en, vi, form]) => {
        setSubmitLoading(true);
        const enData = {
          lang: "en",
          ...(isEmpty(en) ? initData["en"] : en),
        };
        const viData = {
          lang: "vi",
          ...(isEmpty(vi) ? initData["vi"] : vi),
        };
        requestUpdate({
          api: "/contact/" + initRow?._id,
          data: {
            images: submitImgs || imgs,
            map: form.map,
            isPrimary: !!form.isPrimary,
            isManufactory: !!form.isManufactory,
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
        <RInput name="map" label="Map" />
      </RForm>
      <RUploads
        onChange={handleImgsChange}
        label="Images"
        initIds={initRow?.images}
      />
    </RDrawer>
  );
}
