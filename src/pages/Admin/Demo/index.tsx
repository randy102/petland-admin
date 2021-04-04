import { message, Tabs } from "antd";
import React, { useState } from "react";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Grid from "./Grid";
import Create from "./Create";

const SAMPLE_LIST = [
  {
    _id: '100001',
    name: 'Randy Liu',
    status: 'CONFIRMED',
    profile: {age: 18, avatar: "default"},
    isActive: true,
    createdAt: 1616853119411
  },
  {
    _id: '100002',
    name: 'John Lennon',
    status: 'WAITING',
    isActive: true,
    profile: {age: 83, avatar: "default"},
    createdAt: 1616653219211
  },
  {
    _id: '100003',
    name: 'Kante',
    status: 'DRAFT',
    isActive: false,
    profile: {age: 35, avatar: "default"},
    createdAt: 1616353199411
  }
]

export default function Demo() {
  const [curTab, setCurTab] = useState('list')

  function refetch(){
    message.info("Refetch!")
  }

  return (
    <div>
      <Tabs activeKey={curTab} onTabClick={(key) => setCurTab(key)}>
        <Tabs.TabPane key="list" tab={<span><UnorderedListOutlined />List</span>}>
          <Grid res={SAMPLE_LIST} loading={false} refetch={refetch}/>
        </Tabs.TabPane>

        <Tabs.TabPane key="add" tab={<span><PlusOutlined />Create</span>}>
          <Create refetch={refetch} setCurTab={setCurTab}/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
