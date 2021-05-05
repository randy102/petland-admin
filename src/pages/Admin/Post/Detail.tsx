import React from 'react'
import RDrawer from "components/Shared/RDrawer";
import RInput from 'components/Shared/RForm/RInput';
import RForm from 'components/Shared/RForm';
import { useForm } from 'antd/lib/form/Form';

type Props = {
    showDetail: boolean
    onClose: () => void
    details: any
}

export default function Detail(props: Props) {
    const [form] = useForm();

    return (
        <RDrawer 
            title="Chi tiết bài đăng" 
            visible={props.showDetail} 
            onClose={props.onClose}
            >
           <RForm form={form} initialValues={props.details}>
                <RInput label="Tên bài đăng" name="name" readonly />
                <RInput label="Người tạo" name="createdName" readonly/>
                <RInput label="Loài" name="category" readonly/>
                <RInput label="Giống" name="subCategory" readonly/>
                <RInput label="Xuất xứ" name="origin" readonly/>
                <RInput label="Giới tính" name="sex" readonly/>
                <RInput label="Tuổi" name="age" readonly/>
                <RInput label="Tiêm chủng" name="vaccination" readonly/>
                <RInput label="Giá" name="price" readonly/>
                <RInput label="Trạng thái" name="state" readonly/>
           </RForm>
        </RDrawer>
    )
}