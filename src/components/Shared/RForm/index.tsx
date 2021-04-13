import React from 'react';
import { Form as AntForm } from 'antd';
import './index.scss';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

export const useForm = AntForm.useForm;

interface RFormProps {
  style?: React.CSSProperties;
  children: any;
  form?: FormInstance;
  initialValues?: Store;
  onEnter?: (e: React.KeyboardEvent) => void;
}

export default function RForm(props: RFormProps) {
  const { style, children, form, initialValues, onEnter = () => {} } = props;
  return (
    <AntForm
      style={{ ...style, maxWidth: 900 }}
      onKeyPress={e => e.key === 'Enter' && onEnter(e)}
      form={form}
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
      validateMessages={validateMessages}
    >
      {children}
    </AntForm>
  );
}

const validateMessages = {
  // eslint-disable-next-line
  required: '${label} không được để trống!',
  // eslint-disable-next-line
  whitespace: '${label} không được để trống!',
  string: {
    // eslint-disable-next-line
    min: '${label} dài tối thiểu ${min} ký tự',
    // eslint-disable-next-line
    max: '${label} dài tối đa ${max} ký tự',
    // eslint-disable-next-line
    range: '${label} dài từ ${min} đến ${max} ký tự',
  },
  number: {
    // eslint-disable-next-line
    min: '${label} tối thiểu ${min}',
    // eslint-disable-next-line
    max: '${label} phải lớn hơn ${max}',
    // eslint-disable-next-line
    range: '${label} phải trong khoảng ${min} đến ${max}',
  },
  pattern: {
    // eslint-disable-next-line
    mismatch: '${label} không hợp lệ',
  },
  types: {
    // eslint-disable-next-line
    integer: '${label} phải là số nguyên',
    // eslint-disable-next-line
    number: '${label} phải là số',
    // eslint-disable-next-line
    email: '${label} không hợp lệ',
    // eslint-disable-next-line
    url: '${label} không phải là URL hợp lệ',
  },
};
