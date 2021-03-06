import { Tabs } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Grid from './Grid';
import Create from './Create';
import { useFetch } from 'utils/request';

export default function Category() {
  const [curTab, setCurTab] = useState('list');
  const [res, { loading, refetch }] = useFetch({
    api: 'category',
    method: 'get',
  });
  
  return (
    <div>
      <Tabs activeKey={curTab} onTabClick={key => setCurTab(key)}>
        <Tabs.TabPane
          key="list"
          tab={
            <span>
              <UnorderedListOutlined />
              Danh sách
            </span>
          }
        >
          <Grid res={res} loading={loading} refetch={refetch} />
        </Tabs.TabPane>

        <Tabs.TabPane
          key="add"
          tab={
            <span>
              <PlusOutlined />
              Tạo mới
            </span>
          }
        >
          <Create refetch={refetch} setCurTab={setCurTab} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
