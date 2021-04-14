import { message, Tag } from 'antd';
import RGrid from 'components/Shared/RGrid';
import React, { useState } from 'react';
import epochToString from 'utils/epochToString';
import { handleRequestError, useMutation } from 'utils/request';

interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [verifying, setVerifying] = useState<boolean>(false);

  const [rejecting, setRejecting] = useState<boolean>(false);

  const requestVerify = useMutation({
    method: 'put',
    api: 'post/verify',
  });

  const requestReject = useMutation({
    method: 'put',
    api: 'post/reject',
  });

  function handleView(rows: any[]) {
    // Open post from main website in new tab
  }

  function handleVerify(rows: any[]) {
    setVerifying(true);

    requestVerify({
      data: {
        ids: rows.map(r => r._id),
      },
    })
      .then(() => {
        message.success('Success!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => {
        setVerifying(false);
      });
  }

  function handleReject(rows: any[]) {
    setRejecting(true);

    requestReject({
      data: {
        ids: rows.map(r => r._id),
      },
    })
      .then(() => {
        message.success('Success!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => {
        setRejecting(false);
      });
  }

  function renderState(value: string) {
    let color = 'default';

    // Change color based on state
    switch (value) {
      case 'DRAFT': {
        color = 'blue';
        break;
      }
      case 'PUBLISHED': {
        color = 'success';
        break;
      }
      case 'REJECTED': {
        color = 'error';
        break;
      }
      case 'PENDING': {
        color = 'gold';
      }
    }

    return <Tag color={color}>{value}</Tag>;
  }

  function renderSex(value: string) {
    if (value === 'FEMALE') return 'Cái';
    return 'Đực';
  }

  return (
    <>
      <RGrid
        loading={loading || rejecting || verifying}
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
            name: 'Duyệt',
            icon: 'CheckOutlined',
            selection: 'single',
            confirm: true,
            onClick: handleVerify,
          },
          {
            name: 'Từ chối',
            icon: 'StopOutlined',
            selection: 'single',
            confirm: true,
            onClick: handleReject,
          },
        ]}
        colDef={[
          { dataIndex: 'name', title: 'Tên' },
          { dataIndex: 'createdAt', title: 'Ngày tạo', render: epochToString },
          { dataIndex: 'createdBy', title: 'Người tạo' },
          {
            dataIndex: 'updatedAt',
            title: 'Ngày cập nhật',
            render: epochToString,
          },
          { dataIndex: 'category', title: 'Thể loại' },
          {
            dataIndex: 'sex',
            title: 'Giới tính',
            render: renderSex,
          },
          { dataIndex: 'vaccination', title: 'Tiêm chủng' },
          { dataIndex: 'age', title: 'Tuổi' },
          { dataIndex: 'price', title: 'Giá' },
          { dataIndex: 'origin', title: 'Xuất xứ' },
          { dataIndex: 'subcategory', title: 'Giống' },
          { dataIndex: 'state', title: 'Trạng thái', render: renderState },
        ]}
      />
    </>
  );
}
