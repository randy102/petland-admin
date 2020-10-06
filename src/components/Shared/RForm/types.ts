import { FormInstance } from "antd/lib/form";

export interface StdRFormProps {
  form?: FormInstance
  init?: any
}

export interface StdCreateProps {
  setCurTab: React.Dispatch<React.SetStateAction<any>>
}