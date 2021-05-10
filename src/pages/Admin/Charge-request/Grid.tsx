import { message, Modal, Tag } from 'antd';
import RForm, { useForm } from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
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

  const [rejectForm] = useForm();

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [stateShowButton, setStateShowButton] = useState<boolean>(false);

  const [verifying, setVerifying] = useState<boolean>(false);

  const [rejecting, setRejecting] = useState<boolean>(false);

  const [details, setDetails] = useState();

  const requestVerify = useMutation({
    method: 'post',
    api: 'charge-request/confirm',
  });

  const requestReject = useMutation({
    method: 'post',
   api: 'charge-request/reject',
 });

  function handleView(rows: any[]) {
    const data = {...rows[0]};
    data.createdAt = data? epochToString(data.createdAt) : data.createdAt;

    switch(data?.state){
      case 'PENDING': {
        data.state = 'Chờ duyệt';
        setStateShowButton(true);
        break;
      }
      case 'DONE': {
        data.state = 'Đã duyệt';
        break;
      }
      case 'FAILED': {
        data.state = 'Đã từ chối';
      }
    }
    data.amount = (String)(data?.amount);
    setShowDetail(true);
    setDetails(data);
  }

  function handleCloseDetail() {
    setShowDetail(false)
    setDetails(undefined)
  }

  function handleVerify(rows: any[]) {
    setVerifying(true);

    requestVerify({
      api: `charge-request/confirm`,
      data: {ids: [rows[0]._id]}
    })
      .then(() => {
        message.success('Duyệt thành công!');
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => {
        setVerifying(false);
      });
  }

  function handleReject(rows: any[]) {
    Modal.confirm({
      title: 'Từ chối yêu cầu',
      content: (
        <RForm form={rejectForm}>
          <RInput
            label="Lý do từ chối"
            name="rejectedReason"
            rules={{ required: true }}
          />
        </RForm>
      ),
      onOk() {
        return new Promise((resolve, reject) => {
          setRejecting(true);
          rejectForm
            .validateFields()
            .then(inputs =>
              requestReject({
                api: `charge-request/reject`,
                data: {
                  ...inputs,
                  id: rows[0]._id},   
                })
            )
            .then(response => {
              message.success('Từ chối thành công!');
              refetch();
              resolve(response);
            })
            .catch(error => {
              handleRequestError()(error);

              reject(true);
            })
            .finally(() => {
              setRejecting(false);
            });
        });
      },
    });
  }

  function renderState(value: string) {
    // Default color and text for HIDDEN state
    let color = 'default';
    let text = 'Đã từ chối';

    // Change color and text based on state
    switch (value) {
      case 'PENDING': {
        color = 'gold';
        text = 'Chờ duyệt';
        break;
      }
      case 'DONE': {
        color = 'success';
        text = 'Đã duyệt';
        break;
      }
      case 'FAILED': {
        color = 'error';
        text = 'Đã từ chối';
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
            name: 'Duyệt',
            icon: 'SyncOutlined',
            selection: 'single',
            confirm: true,
            confirmMessage: 'Duyệt yêu cầu này?',
            onClick: handleVerify,
            disabled: rows => !rows.length || rows[0].state !== 'PENDING',
          },
          {
            name: 'Từ chối',
            icon: 'StopOutlined',
            selection: 'single',
            onClick: handleReject,
            disabled: rows => !rows.length || rows[0].state !== 'PENDING',
          },
        ]}
        colDef={[
          {
            dataIndex: 'createdName',
            title: 'Người yêu cầu',
          },
          {
            dataIndex: 'state',
            title: 'Trạng thái',
            render: renderState,
          },
          {
            dataIndex: 'amount',
            title: 'Số điểm',
          },
          {
            dataIndex: 'code',
            title: 'Mã thanh toán',
          },
          {
            dataIndex: 'phone',
            title: 'Số điện thoại',
          },
          {
            dataIndex: 'rejectedReason',
            title: 'Lí do từ chối',
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
        stateShowButton={stateShowButton}
        setStateShowButton={setStateShowButton}
        onClose={handleCloseDetail} 
        details={details} 
        refetch={refetch}
      />
    </>
  );
}
