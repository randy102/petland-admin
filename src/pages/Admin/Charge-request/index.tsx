import { UnorderedListOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useFetch } from 'utils/request';
import Grid from './Grid';

export default function Post() {
  const [curTab, setCurTab] = useState('list');
  
  const [res, { loading, refetch }] = useFetch({
    api: 'charge-request',
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
      </Tabs>
    </div>
  );
}
