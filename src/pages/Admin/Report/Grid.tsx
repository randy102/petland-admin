import { message, Tag } from 'antd';
import RGrid from 'components/Shared/RGrid';
import React, { useState } from 'react';
import epochToString from 'utils/epochToString';
import { handleRequestError, useMutation } from 'utils/request';
import Detail from './Detail';

interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [verifying, setVerifying] = useState<boolean>(false);

  const [details, setDetails] = useState()

  const requestVerify = useMutation({
    method: 'put',
    api: 'report/resolve',
  });

  function handleView(rows: any[]) {
    const data = {...rows[0]};
    setShowDetail(true)
    setDetails(data)
  }

  function handleCloseDetail() {
    setShowDetail(false)
    setDetails(undefined)
  }

  function handleVerify(rows: any[]) {
    setVerifying(true);

    requestVerify({
      api: `report/resolve`,
      data: {ids: [rows[0]._id]}
    })
      .then(() => {
        message.success('Đã xử lí báo cáo!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => {
        setVerifying(false);
      });
  }

  function renderState(value: boolean) {
    // Default color and text for HIDDEN state
    let color = 'default';
    let text = 'Chưa xử lí';

    // Change color and text based on state
    switch (value) {
      case false: {
        color = 'blue';
        text = 'Chưa xử lí';
        break;
      }
      case true: {
        color = 'success';
        text = 'Đã xử lí';
        break;
      }
    }

    return <Tag color={color}>{text}</Tag>;
  }

  return (
    <>
      <RGrid
        loading={loading}
        data={res?.data}
        headDef={[
          {
            type: 'refresh',
            onClick: () => refetch(),
          },
          {
            type: 'detail',
            onClick: handleView,
          },
          {
            name: 'Đã xử lí',
            icon: 'SyncOutlined',
            selection: 'single',
            confirm: true,
            confirmMessage: 'Đã xử lí báo cáo này?',
            onClick: handleVerify,
            disabled: rows => !rows.length || rows[0].resolved == true,
          },
        ]}
        colDef={[
          {
            dataIndex: 'email',
            title: 'Email',
          },
          {
            dataIndex: 'resolved',
            title: 'Trạng thái',
            render: renderState,
          },
          {
            dataIndex: 'content',
            title: 'Nội dung',
          },
          {
            dataIndex: 'createdAt',
            title: 'Ngày tạo',
            render: epochToString,
          },
        ]}
      />

      <Detail 
        setShowDetail={setShowDetail} 
        showDetail={showDetail} 
        onClose={handleCloseDetail} 
        details={details} 
        refetch={refetch}
        />
    </>
  );
}
