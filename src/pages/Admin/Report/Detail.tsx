import React, { useEffect, useState } from 'react'
import RDrawer from "components/Shared/RDrawer";
import RInput from 'components/Shared/RForm/RInput';
import RForm from 'components/Shared/RForm';
import { useForm } from 'antd/lib/form/Form';
import { Button, message, Space } from 'antd';
import { handleRequestError, useMutation } from 'utils/request';

interface updateProps{
    setShowDetail: React.Dispatch<boolean>
    showDetail: boolean
    onClose: () => void
    details: any
    refetch: Function
  }

export default function Detail(props: updateProps) {
    const { setShowDetail, refetch } = props;

    const [form] = useForm();

    const [loading,setLoading] = useState(false);

    const resolved = Boolean(props.details?.resolved);

    useEffect(() => form?.resetFields(), [props.details]);

    const requestUpdate = useMutation({api: 'report/resolve', method: 'put'})

    function handleSubmit() {
        form.validateFields().then(() => {
          setLoading(true);
          requestUpdate({ 
            data: {
              ids: [props.details._id],
            }
          })
            .then(() => {
              message.success('Đã xử lí báo cáo!');
              setShowDetail(false);
              refetch();
            })
            .catch(handleRequestError(form))
            .finally(() => setLoading(false));
        });
      }

    return (
        <RDrawer 
            title="Chi tiết báo cáo" 
            visible={props.showDetail} 
            onClose={props.onClose}
            >
           <RForm form={form} initialValues={props.details}>
                <RInput label="Nội dung" name="content" readonly />
           </RForm>
           <Space>
                <Button disabled={resolved} loading={loading} type="primary" onClick={handleSubmit}>
                Đã xử lí
                </Button>
            </Space>
        </RDrawer>
    )
}