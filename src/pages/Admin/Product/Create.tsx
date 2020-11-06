import { Button, message, Space, Tabs } from "antd";
import RForm, { useForm } from "components/Shared/RForm";
import RSelect from "components/Shared/RForm/RSelect";
import RUploads, { UploadApi } from "components/Shared/RForm/RUploads";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { Dispatch, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { handleRequestError, useFetch, useMutation } from "utils/request";
import { CATEGORY_TYPES } from "./CATEGORY_TYPES";
import Form from "./Form";

interface CreateProps extends StdCreateProps {
  refetch: Function;
  setCurTab: Dispatch<string>;
}

export default function Create(props: CreateProps) {
  const { setCurTab, refetch } = props;

  const [enForm] = useForm();
  const [viForm] = useForm();
  const [form] = useForm();
  const [enCK, setEnCK] = useState<string>();
  const [viCK, setViCK] = useState<string>();
  const [imgs, setImgs] = useState<string[]>();

  const [uploadAPI, setUploadAPI] = useState<UploadApi>();
  const [lang, setLang] = useState<string>("vi");
  const [saveLoading, setSaveLoading] = useState(false);
  const [type, setType] = useState<string>();

  const [resCategory, { refetch: refetchCategory }] = useFetch({
    api: "/product/category",
  });
  const requestCreate = useMutation({ api: "/product", method: "post" });

  function handleSave() {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    const formInputs = form.validateFields();
    Promise.all([enInputs, viInputs, formInputs])
      .then(([en, vi, form]) => {
        setSaveLoading(true);

        let toCreateData = [];
        if (!isEmpty(en)) {
          toCreateData.push({ ...en, content: enCK, lang: "en" });
        }
        if (!isEmpty(vi)) {
          toCreateData.push({ ...vi, content: viCK, lang: "vi" });
        }

        requestCreate({
          data: {
            images: imgs || [],
            type: form.type,
            categoryId: form.categoryId,
            data: toCreateData,
          },
        })
          .then(() => {
            message.success("Success!");
            refetch();
            setCurTab("list");
            viForm.resetFields();
            enForm.resetFields();
            setEnCK("");
            setViCK("");
            uploadAPI?.reset();
          })
          .catch(handleRequestError)
          .finally(() => setSaveLoading(false));
      })
      .catch(handleFieldError);
  }

  function handleCopy() {
    const viData = viForm.getFieldsValue();
    switch (lang) {
      case "en":
        setEnCK(viCK);
        enForm.setFieldsValue(viData);
        return;
    }
  }

  function handleTypeChange(type: string) {
    form.resetFields(["categoryId"]);
    setType(type);
  }

  return (
    <>
      <Tabs
        style={{ maxWidth: 900 }}
        type="card"
        activeKey={lang}
        onTabClick={setLang}
        tabBarExtraContent={
          <Space style={{ transform: "translateY(4px)" }}>
            {lang !== "vi" && (
              <Button onClick={handleCopy}>Copy from Vietnamese</Button>
            )}
            <Button loading={saveLoading} onClick={handleSave} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Tabs.TabPane key="vi" tab="Vietnamese">
          <Form form={viForm} onChange={setViCK} initCK={viCK} />
        </Tabs.TabPane>

        <Tabs.TabPane key="en" tab="English">
          <Form form={enForm} onChange={setEnCK} initCK={enCK} />
        </Tabs.TabPane>
      </Tabs>
      <RForm form={form}>
        <RSelect
          data={CATEGORY_TYPES}
          label="Type"
          name="type"
          labelRender={(row) => row.name}
          optionRender={(row) => row.name}
          optionValue={(row) => row._id}
          required
          onChange={handleTypeChange}
        />
        <RSelect
          refetch={refetchCategory}
          data={resCategory?.data.filter((cate: any) => cate.type === type)}
          label="Category"
          name="categoryId"
          labelRender={(row) => row[lang]}
          optionRender={(row) => row[lang]}
          optionValue={(row) => row._id}
          filterProps={(row) => [row.en, row.vi]}
          required
        />
      </RForm>
      <RUploads onChange={setImgs} label="Images" uploadApi={setUploadAPI} />
    </>
  );
}
