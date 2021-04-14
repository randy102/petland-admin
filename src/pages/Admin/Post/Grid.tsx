import { message, Modal, Tag } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import RForm from 'components/Shared/RForm';
import RInput from 'components/Shared/RForm/RInput';
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

  const [rejectForm] = useForm();

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
      api: `post/verify/${rows[0]._id}`,
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

  function submitReject(_id: string) {
    rejectForm.validateFields().then(inputs => {
      setRejecting(true);

      requestReject({
        api: `post/reject/${_id}`,
        data: inputs,
      })
        .then(() => {
          message.success('Từ chối thành công!');
          refetch();
        })
        .catch(handleRequestError)
        .finally(() => {
          setRejecting(false);
        });
    });
  }

  function handleReject(rows: any[]) {
    Modal.confirm({
      title: 'Từ chối bài viết',
      content: (
        <RForm form={rejectForm}>
          <RInput
            label="Lý do từ chối"
            name="reason"
            rules={{ required: true }}
          />
        </RForm>
      ),
      onOk: () => submitReject(rows[0]._id),
    });
  }

  function renderState(value: string) {
    // Default color and text for HIDDEN state
    let color = 'default';
    let text = 'Đã ẩn';

    // Change color and text based on state
    switch (value) {
      case 'DRAFT': {
        color = 'blue';
        text = 'Bản nháp';
        break;
      }
      case 'PUBLISHED': {
        color = 'success';
        text = 'Đã duyệt';
        break;
      }
      case 'REJECTED': {
        color = 'error';
        text = 'Đã từ chối';
        break;
      }
      case 'PENDING': {
        color = 'gold';
        text = 'Chờ duyệt';
      }
    }

    return <Tag color={color}>{text}</Tag>;
  }

  function renderSex(value: string) {
    if (value === 'MAKE') return 'Đực';
    return 'Cái';
  }

  function renderVaccination(value: boolean) {
    if (value) return 'Có';
    return 'Không';
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
            confirmMessage: 'Duyệt các bài đăng này?',
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
          { dataIndex: 'name', title: 'Tên bài đăng' },
          { dataIndex: 'createdBy', title: 'Người tạo' },
          { dataIndex: 'createdAt', title: 'Ngày tạo', render: epochToString },
          {
            dataIndex: 'updatedAt',
            title: 'Ngày cập nhật',
            render: epochToString,
          },
          { dataIndex: 'category', title: 'Thể loại' },
          { dataIndex: 'subCategory', title: 'Giống' },
          { dataIndex: 'origin', title: 'Xuất xứ' },
          {
            dataIndex: 'sex',
            title: 'Giới tính',
            render: renderSex,
          },
          { dataIndex: 'age', title: 'Tuổi' },
          {
            dataIndex: 'vaccination',
            title: 'Đã tiêm chủng',
            render: renderVaccination,
          },
          { dataIndex: 'price', title: 'Giá' },
          { dataIndex: 'state', title: 'Trạng thái', render: renderState },
        ]}
      />
    </>
  );
}
