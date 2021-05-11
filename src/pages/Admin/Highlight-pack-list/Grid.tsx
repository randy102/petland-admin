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

  const [deleting, setDeleting] = useState<boolean>(false);

  const [hiding, setHiding] = useState<boolean>(false);
  
  const [publish, setPublish] = useState<boolean>(false);

  const requestDelete = useMutation({ method: 'delete', api: 'pack' });

  const requestHide = useMutation({ method: 'put', api: 'pack/hide' });

  const requestPublish = useMutation({ method: 'put', api: 'pack/publish' });

  function handleUpdate(row: any[]) {
    setInitRow(row[0]);
    setShowForm(true);
  }

  function handleDelete(row: any[]) {
    setDeleting(true);

    requestDelete({
      data: row?.map(r => r._id)
    })
      .then(() => {
        message.success('Xóa thành công!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => setDeleting(false));
  }

  function handleHide(row: any[]){
    setHiding(true);

    requestHide({
      data: row?.map(r => r._id )
    })
      .then(() => {
        message.success('Ẩn thành công!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => setHiding(false));
  }

  function renderState(value: boolean){
    let color = 'error';
    let text = 'Đã ẩn';

    if( value ){
      color = 'success';
      text = 'Công khai';
    }

    return <Tag color={color}>{text}</Tag>
  }

  function handlePublish(row: any[]){
    setPublish(true);

    requestPublish({
      data: row?.map( r => r._id )
    })
    .then(() => {
      message.success('Công khai thành công!');
      refetch();
    })
    .catch(handleRequestError)
    .finally(() => setPublish(false));
  }

  function disablePublish(row: any[]){
    let disable: boolean = false;

    row?.forEach(element => {
      if( element.state == true){
        disable = true;
      }   
    });
    return disable;
  }

  function disableHide(row: any[]){
    let disable: boolean = false;

    row?.forEach(element => {
      if( element.state == false){
        disable = true;
      }   
    });
    return disable;
  }

  return (
    <>
      <RGrid
        loading={loading || deleting || hiding || publish}
        data={res?.data}
        headDef={[
          { type: 'refresh', onClick: () => refetch() },
          { type: 'update', onClick: handleUpdate },
          { type: 'delete', onClick: handleDelete },
          { 
            type: 'hide', 
            onClick: handleHide,
            disabled: disableHide,
           },
          { 
            type: 'publish', 
            onClick: handlePublish, 
            disabled: disablePublish,
          },
        ]}
        colDef={[
          { 
            dataIndex: 'name', 
            title: 'Tên', 
          },
          { 
            dataIndex: 'state', 
            title: 'Trạng thái',
            render: renderState,
          },
          { 
            dataIndex: 'dayNumber', 
            title: 'Số ngày áp dụng', 
          },
          { 
            dataIndex: 'price', 
            title: 'Giá', 
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
