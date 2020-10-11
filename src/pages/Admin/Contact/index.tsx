import { Tabs } from "antd";
import React, { useState } from "react";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Create from "./Create";
import { useFetch } from "utils/request";
import Grid from "./Grid";

export default function Contact() {
  const [curTab, setCurTab] = useState('list')
  const [res, { loading, refetch }] = useFetch({ api: "/contact" });

  return (
    <div>
      <Tabs activeKey={curTab} onTabClick={(key) => setCurTab(key)}>
        <Tabs.TabPane key="list" tab={<span><UnorderedListOutlined />List</span>}>
          <Grid res={res} loading={loading} refetch={refetch}/>
        </Tabs.TabPane>

        <Tabs.TabPane key="add" tab={<span><PlusOutlined />Create</span>}>
          <Create refetch={refetch} setCurTab={setCurTab}/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
