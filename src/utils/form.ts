import { message } from "antd";

export function handleFieldError(error: any){
  message.error("Please complete all fields in each tab correctly!");
}

export function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}