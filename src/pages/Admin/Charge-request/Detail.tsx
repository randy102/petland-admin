import React, { useEffect, useState } from 'react'
import RDrawer from "components/Shared/RDrawer";
import RInput from 'components/Shared/RForm/RInput';
import RForm from 'components/Shared/RForm';
import { useForm } from 'antd/lib/form/Form';
import { Button, message, Modal } from 'antd';
import { handleRequestError, useMutation } from 'utils/request';

interface updateProps{
    setShowDetail: React.Dispatch<boolean>
    showDetail: boolean
    setStateShowButton: React.Dispatch<boolean>
    stateShowButton: boolean
    onClose: () => void
    details?: any
    refetch: Function
  }

export default function Detail(props: updateProps) {
    const { 
      setShowDetail, 
      refetch, 
      showDetail,
      details, 
      setStateShowButton,
      stateShowButton,
    } = props;

    const [form] = useForm();

    const [rejectForm] = useForm();

    const [submitloading,setSubmitLoading] = useState(false);

    const [rejectloading,setRejectLoading] = useState(false);

    useEffect(() => form?.resetFields(), [details]);

    const requestVerify = useMutation({
      api: 'charge-request/confirm', 
      method: 'post'
    })

    const requestReject = useMutation({
       method: 'post',
      api: 'charge-request/reject',
    });

    function handleClose() {
      setShowDetail(false);
      setStateShowButton(false);
    }  

    function handleSubmit() {
      setSubmitLoading(true);
      form.validateFields().then(() => {
        requestVerify({ 
          data: {
            ids: [details._id],
          }
        })
          .then(() => {
            message.success('Duyệt thành công!');
            setShowDetail(false);
            refetch();
          })
          .catch(handleRequestError(form))
          .finally(() => { setSubmitLoading(false)} );
      });
    }

    function handleReject() {
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
          setRejectLoading(true);
          return new Promise((resolve, reject) => {
            rejectForm
              .validateFields()
              .then(inputs =>
                requestReject({
                  api: `charge-request/reject`,
                  data: {
                    ...inputs,
                    id: details._id,
                  }
                })
              )
              .then(response => {
                message.success('Từ chối thành công!');
                refetch();
                resolve(response);
                setRejectLoading(false)
                setShowDetail(false);
              })
              .catch(error => {
                handleRequestError()(error);
  
                reject(true);
              })
          });
        },
      });
    }

    return (
        <RDrawer 
          title="Chi tiết yêu cầu"
          onClose={handleClose}
          visible={showDetail}
          footDef={[
            {
              name: 'Duyệt',
              type: 'primary',
              visible: stateShowButton,
              onClick: handleSubmit,
              loading: submitloading,
            },
            {
              name: 'Từ chối',
              type: 'primary',
              visible: stateShowButton,
              onClick: handleReject,
              loading: rejectloading,
            },
          ]}
        >
           <RForm form={form} initialValues={details}>
                <RInput label="Người yêu cầu" name="createdName" readonly />
                <RInput label="Trạng thái" name="state" readonly />
                <RInput label="Số điểm" name="amount" readonly />
                <RInput label="Mã thanh toán" name="code" readonly />
                <RInput label="Số điện thoại" name="phone" readonly />
                <RInput label="Lí do từ chối" name="rejectedReason" readonly />
                <RInput label="Ngày tạo" name="createdAt" readonly />
           </RForm>
        </RDrawer>
    )
}