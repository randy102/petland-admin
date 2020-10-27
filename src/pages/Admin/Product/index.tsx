import { Tabs } from "antd";
import React, { useState } from "react";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Create from "./Create";
import { useFetch } from "utils/request";
import Grid from "./Grid";
import CreateCategory from "./CreateCategory";
import GridCategory from "./GridCategory";

export default function Product() {
  const [curTab, setCurTab] = useState('list')
  const [res, { loading, refetch }] = useFetch({ api: "/product" });
  const [resCategory, { loading: loadingCategory,refetch: refetchCategory }] = useFetch({ api: "/product/category" });

  return (
    <div>
      <Tabs activeKey={curTab} onTabClick={(key) => setCurTab(key)}>
        <Tabs.TabPane key="list" tab={<span><UnorderedListOutlined />Products</span>}>
          <Grid res={res} loading={loading} refetch={refetch}/>
        </Tabs.TabPane>
        <Tabs.TabPane key="add" tab={<span><PlusOutlined />Crate Product</span>}>
          <Create refetch={refetch} setCurTab={setCurTab}/>
        </Tabs.TabPane>

        <Tabs.TabPane key="list-cate" tab={<span><UnorderedListOutlined />Categories</span>}>
          <GridCategory res={resCategory} loading={loadingCategory} refetch={refetchCategory}/>
        </Tabs.TabPane>

        <Tabs.TabPane key="add-cate" tab={<span><PlusOutlined />Create Category</span>}>
          <CreateCategory refetch={refetchCategory} setCurTab={setCurTab}/>
        </Tabs.TabPane>


      </Tabs>
    </div>
  );
}
