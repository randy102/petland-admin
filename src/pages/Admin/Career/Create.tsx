import { Button, message, Space, Tabs } from "antd";
import RForm, { useForm } from "components/Shared/RForm";
import RInput from "components/Shared/RForm/RInput";
import RSelect from "components/Shared/RForm/RSelect";
import RSwitch from "components/Shared/RForm/RSwitch";
import RUploads, { UploadApi } from "components/Shared/RForm/RUploads";
import { StdCreateProps } from "components/Shared/RForm/types";
import React, { Dispatch, useState } from "react";
import { handleFieldError, isEmpty } from "utils/form";
import { handleRequestError, useFetch, useMutation } from "utils/request";
import moment from "moment";
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

  const [resCategory, { refetch: refetchCategory }] = useFetch({
    api: "/career/category",
  });
  const requestCreate = useMutation({ api: "/career", method: "post" });

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
            online: !!fo.online,
            images: imgs || [],
            data: toCreateData,
          },
        })
          .then(() => {
            message.success("Success!");
            refetch();
            setCurTab("list");
            form.resetFields();
            viForm?.resetFields();
            enForm?.resetFields();
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
          refetch={refetchCategory}
          data={resCategory?.data}
          label="Category"
          name="categoryId"
          labelRender={(row) => row[lang]}
          optionRender={(row) => row[lang]}
          optionValue={(row) => row._id}
          filterProps={(row) => [row.en, row.vi]}
          required
        />

        <RSwitch
          name="online"
          label="Type"
          checkedText="Online"
          unCheckedText="Offline"
        />

        <RInput name="number" label="Number" number />

        <RInput
          name="period"
          label="Period (Days)"
          onChange={(period: number) => form.setFieldsValue({expired: moment().add("day", period).format("D/M/YYYY")})}
          number
          rules={{required: true}}
        />

        <RInput
          name="expired"
          label="Job will be expired at"
          disabled
        />

      </RForm>
      <RUploads onChange={setImgs} label="Images" uploadApi={setUploadAPI} />
    </>
  );
}
