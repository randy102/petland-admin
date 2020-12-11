import { Button, message, Space, Tabs } from "antd";
import { POST_STATUS } from "components/Shared/POST_STATUS";
import RForm, { useForm } from "components/Shared/RForm";
import RSelect from "components/Shared/RForm/RSelect";
import RUploads, { UploadApi } from "components/Shared/RForm/RUploads";
import RUpload, {
  UploadApi as MainUploadApi,
} from "components/Shared/RForm/RUpload";

import { StdCreateProps } from "components/Shared/RForm/types";
import React, { Dispatch, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { handleRequestError, useFetch, useMutation } from "utils/request";
import { CATEGORY_TYPES } from "./CATEGORY_TYPES";
import Form from "./Form";
import { PROJECT_STATUS } from "./PROJECT_STATUS";
import RSwitch from "components/Shared/RForm/RSwitch";

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
  const [img, setImg] = useState<string>();

  const [mainUploadAPI, setMainUploadAPI] = useState<MainUploadApi>();
  const [type, setType] = useState<string>();
  const [uploadAPI, setUploadAPI] = useState<UploadApi>();
  const [lang, setLang] = useState<string>("vi");
  const [saveLoading, setSaveLoading] = useState(false);

  const [resCategory, { refetch: refetchCategory }] = useFetch({
    api: "/project/category",
  });
  const requestCreate = useMutation({ api: "/project", method: "post" });

  function handleSave() {
    const enInputs = enForm.validateFields();
    const viInputs = viForm.validateFields();
    const formInputs = form.validateFields();
    Promise.all([enInputs, viInputs, formInputs])
      .then(([en, vi, fo]) => {
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
            ...fo,
            images: imgs || [],
            mainImage: img || "",
            isPrimary: !!fo.isPrimary,
            data: toCreateData,
          },
        })
          .then(() => {
            message.success("Success!");
            refetch();
            setCurTab("list");
            viForm.resetFields();
            enForm.resetFields();
            form.resetFields();
            setEnCK("");
            setViCK("");
            uploadAPI?.reset();
            mainUploadAPI?.reset();
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

        <RSelect
          data={PROJECT_STATUS}
          label="Project Status"
          name="projectStatus"
          labelRender={(row) => row.name}
          optionRender={(row) => row.name}
          optionValue={(row) => row._id}
          required
        />

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
      </RForm>

      <RUpload
        onChange={setImg}
        label="Main Image"
        crop={false}
        uploadApi={setMainUploadAPI}
      />

      <RUploads onChange={setImgs} label="Images" uploadApi={setUploadAPI} />
    </>
  );
}
