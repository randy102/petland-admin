import { message, Tag } from 'antd';
import RGrid from 'components/Shared/RGrid';
import React, { useState } from 'react';
import { handleRequestError, useMutation } from 'utils/request';
import Update from './Update';

interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [showForm, setShowForm] = useState(false);
  const [initRow, setInitRow] = useState<any>();

  const requestLock = useMutation({ method: 'put', api: 'user/lockUser' });
  const requestDelete = useMutation({ method: 'delete', api: 'user' });

  function toggleLock([row]: any[]) {
    requestLock({
      data: {
        isActive: !row?.isActive,
        id: row?._id,
      },
    })
      .then(() => {
        message.success('Success!');
        refetch();
      })
      .catch(handleRequestError);
  }

  function handleUpdate(row: any[]) {
    row[0].password = '';
    setInitRow(row[0]);
    setShowForm(true);
  }

  function handleDelete(row: any[]) {
    requestDelete({
      data: {
        ids: row?.map(r => r._id),
      },
    })
      .then(() => {
        message.success('Success!');
        refetch();
      })
      .catch(handleRequestError);
  }

  return (
    <>
      <RGrid
        loading={loading}
        data={res?.data}
        headDef={[
          { type: 'refresh', onClick: () => refetch() },
          { type: 'update', onClick: handleUpdate },
          { type: 'delete', onClick: handleDelete },
          {
            name: 'Khóa/Mở khóa',
            icon: 'LockFilled',
            selection: 'single',
            confirm: true,
            onClick: toggleLock,
          },
        ]}
        colDef={[
          { dataIndex: 'email' },
          { dataIndex: 'phone', title: 'Điện thoại' },
          { dataIndex: 'name', title: 'Tên' },
          { dataIndex: 'role', title: 'Vai trò' },
          {
            dataIndex: 'isActive',
            title: 'Status',
            render: isActive =>
              isActive ? (
                <Tag color={'success'}>Hoạt động</Tag>
              ) : (
                <Tag color={'default'}>Bị khóa</Tag>
              ),
          },
        ]}
      />

      <Update
        {...{
          setInitRow,
          initRow,
          showForm,
          setShowForm,
          refetch,
        }}
      />
    </>
  );
}
