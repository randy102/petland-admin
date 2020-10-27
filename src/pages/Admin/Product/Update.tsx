import { message, Tabs } from "antd";
import RDrawer from "components/Shared/RDrawer";
import RForm, { useForm } from "components/Shared/RForm";
import RSelect from "components/Shared/RForm/RSelect";
import RSwitch from "components/Shared/RForm/RSwitch";
import RUploads from "components/Shared/RForm/RUploads";
import React, { useEffect, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { getLang } from "utils/languages";
import { handleRequestError, useFetch, useMutation } from "utils/request";
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
  const [enCK, setEnCK] = useState<string>();
  const [viCK, setViCK] = useState<string>();
  const [imgs, setImgs] = useState<string[]>();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [resCategory] = useFetch({api: "/product/category"})
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
      setImgs(initRow?.images);
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
    setImgs(undefined);
    enForm.resetFields();
    viForm.resetFields();
    form.resetFields();
  }

  function handleSubmit(submitImgs?: string[]) {
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
            content: enCK,
            ...(isEmpty(en) ? initData["en"] : en),
          });

        data.push({
          lang: "vi",
          content: viCK,
          ...(isEmpty(vi) ? initData["vi"] : vi),
        });

        requestUpdate({
          api: "/product/" + initRow?._id,
          data: {
            isService: !!form.isService,
            categoryId: form.categoryId,
            images: submitImgs || imgs,
            data,
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
          name="isService"
          label="Type"
          checkedText="Service"
          unCheckedText="Product"
        />
        <RSelect
          data={resCategory?.data}
          label="Category"
          name="categoryId"
          labelRender={(row) => row[lang]}
          optionRender={(row) => row[lang]}
          optionValue={(row) => row._id}
          filterProps={(row) => [row.en, row.vi]}
          required
        />
      </RForm>
      <RUploads
        onChange={handleImgsChange}
        label="Images"
        initIds={initRow?.images}
      />
    </RDrawer>
  );
}
