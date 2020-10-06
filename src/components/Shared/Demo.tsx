import React, { useState } from "react";
import { Form } from "antd";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import RForm from "./RForm";
import RInput from "./RForm/RInput";
import RDate from "./RForm/RDate";
import RPassword from "./RForm/RPassword";
import RRadio from "./RForm/RRadio";
import RSelect from "./RForm/RSelect";
import RSwitch from "./RForm/RSwitch";
import RDrawer from "./RDrawer";
import RGrid from "./RGrid";

const FAKE_DATA = [
  {
    _id: 1,
    name: "John Terry",
  },
  {
    _id: 2,
    name: "Frank Lampard",
  },
  {
    _id: 3,
    name: "Micheal Ballack",
  },
];

export default function Demo() {
  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <div style={{ width: 500, margin: "20px auto" }}>
      <RForm form={form}>
        <RInput
          label="Input"
          name="text-input"
          prefix={<EditOutlined />}
          suffix="Suffix"
          rules={{
            max: 5,
            min: 2,
            pattern: /^A.*/,
            required: true,
            type: "email",
            message:
              "Must contains 2-5 charater, begin with A letter and is val_id email",
          }}
        />

        <RInput
          label="Number"
          name="number-input"
          number
          rules={{
            max: 10,
            min: 5,
            message: "Must between 5-10",
          }}
        />

        <RInput
          label="Price"
          name="price-input"
          price
          style={{ width: "50%" }}
        />

        <RDate label="Date" name="date" />

        <RPassword label="Password" name="password" prefix={<LockOutlined />} />

        <RRadio
          label="Radio"
          name="radio"
          data={FAKE_DATA}
          required
          optionRender={(r) => r.name}
          optionValue={(r) => r._id}
        />

        <RSelect
          label="Select"
          name="select"
          data={FAKE_DATA}
          required
          optionRender={(r) => r.name}
          optionValue={(r) => r._id}
          labelRender={(r) => `${r.name} label`}
          filterProps={(r) => [r.name]}
          showSearch
        />

        <RSelect
          label="Multiple Select"
          name="select-multi"
          data={FAKE_DATA}
          required
          optionRender={(r) => r.name}
          optionValue={(r) => r._id}
          labelRender={(r) => `${r.name} label`}
          filterProps={(r) => [r.name]}
          showSearch
          mode="multiple"
        />

        <RSelect
          label="Tags Select (Can add custom tags)"
          name="select-tag"
          data={FAKE_DATA}
          required
          optionRender={(r) => r.name}
          optionValue={(r) => r._id}
          labelRender={(r) => `${r.name} label`}
          filterProps={(r) => [r.name]}
          showSearch
          mode="tags"
        />

        <RSwitch
          label="Switch"
          name="switch"
          checkedText="True"
          unCheckedText="False"
        />
      </RForm>

      <RGrid
        data={FAKE_DATA}
        headDef={[
          {
            type: "refresh",
          },
          {
            type: "create",
            onClick: () => setShowDrawer(true),
          },
          {
            type: "delete"
          }
        ]}
        colDef={[
          {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name: string) => name.toUpperCase(),
          },
        ]}
      />

      <RDrawer
        title="Drawer Title"
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        footDef={[
          {
            name: "Close",
            onClick: () => setShowDrawer(false),
            type: "primary",
          },
        ]}
      >
        This is Drawer's content
      </RDrawer>
    </div>
  );
}
