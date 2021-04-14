import { message } from 'antd';

export function handleFieldError(error: any) {
  message.error('Xin hãy điền đủ thông tin');
}

export function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}
