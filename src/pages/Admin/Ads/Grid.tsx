import { message } from 'antd';
import RGrid from 'components/Shared/RGrid';
import RImage from 'components/Shared/RImage';
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

  const [deleting, setDeleting] = useState<boolean>(false);

  const requestDelete = useMutation({ method: 'delete', api: 'ads' });

  function handleUpdate(row: any[]) {
    setInitRow(row[0]);
    setShowForm(true);
  }

  function handleDelete(row: any[]) {
    setDeleting(true);

    requestDelete({
      data: {
        ids: row?.map(r => r._id),
      },
    })
      .then(() => {
        message.success('Xóa thành công!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => setDeleting(false));
  }

  return (
    <>
      <RGrid
        loading={loading || deleting}
        data={res?.data}
        headDef={[
          { type: 'refresh', onClick: () => refetch() },
          { type: 'update', onClick: handleUpdate },
          { type: 'delete', onClick: handleDelete },
        ]}
        colDef={[
          { dataIndex: 'partner', title: 'Đối tác' },
          { dataIndex: 'url', title: 'Liên kết trang' },
          {
            dataIndex: "fileID",
            title: "Hình ảnh",
            render: (fileID) => <RImage id={fileID} width={120}/>,
          },
          { dataIndex: 'position', title: 'Vị trí trên trang web' }
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
