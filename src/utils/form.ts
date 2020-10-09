import { message } from "antd";

export function handleFieldError(error: any){
  console.log({error})
  message.error("Please complete all fields in each tab correctly!");
}