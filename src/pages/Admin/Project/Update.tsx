import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import RUploads from "components/Shared/RForm/RUploads";
import React, { useEffect, useState } from "react";
import { handleFieldError } from "utils/form";
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
  const [enCK, setEnCK] = useState<any>();
  const [viCK, setViCK] = useState<any>();
  const [imgs, setImgs] = useState<string[]>();

  const [submitLoading, setSubmitLoading] = useState(false);
  const requestUpdate = useMutation({ method: "put" });

  const initData: any = {
    en: getLang("en", initRow),
    vi: getLang("vi", initRow),
  };

  useEffect(() => {
    enForm.setFieldsValue(initData["en"]);
    viForm.setFieldsValue(initData["vi"]);
    setEnCK(initData["en"].content);
    setViCK(initData["vi"].content);
    setImgs(initRow?.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRow, lang]);

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
    setEnCK(undefined);
    setViCK(undefined);
    setImgs(undefined);
  }

  async function handleSubmit(submitImgs?: string[]) {
    try {
      const enInputs = await enForm.validateFields();
      const viInputs = await viForm.validateFields();

      setSubmitLoading(true);
      requestUpdate({
        api: "/project/" + initRow?._id,
        data: {
          images: submitImgs || imgs,
          data: [
            {
              ...(enInputs.name ? enInputs : initData["en"]),
              content: enCK,
              lang: "en",
            },
            {
              ...(viInputs.name ? viInputs : initData["vi"]),
              content: viCK,
              lang: "vi",
            },
          ],
        },
      })
        .then(() => {
          if(!submitImgs){
            handleClose();
            message.success("Success!");
          }
          refetch();
        })
        .catch(handleRequestError)
        .finally(() => setSubmitLoading(false));
    } catch (err) {
      handleFieldError(err);
    }
  }

  function handleImgsChange(imgs: string[]) {
    setImgs(imgs);
    handleSubmit(imgs)
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
          onClick: () => handleSubmit(),
          loading: submitLoading,
        },
        {
          name: "Close",
          onClick: handleClose,
        },
      ]}
    >
      <Tabs type="card" activeKey={lang} onTabClick={setLang}>
        <Tabs.TabPane key="en" tab="English">
          <Form
            form={enForm}
            onChange={setEnCK}
            initCK={initData.en?.content}
          />
        </Tabs.TabPane>

        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form
            form={viForm}
            onChange={setViCK}
            initCK={initData.vi?.content}
          />
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
