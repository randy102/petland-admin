import React, { useState, useEffect, useCallback } from "react";
import { Form, Upload, message, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as axios from "axios";
import "./ruploads.scss";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { getToken } from "utils/auth";

const Axios = axios.default;

export interface UploadApi {
  reset: () => void;
}

interface RUploadsProps {
  // URL to upload image
  url?: string;
  label?: string;
  initId?: string;
  initName?: string;
  disabled?: boolean;
  onChange?: (file: string) => void;
  uploadApi?: (uploadApi: UploadApi) => void;
}

export default function RUploads(props: RUploadsProps) {
  const {
    disabled = false,
    uploadApi = () => {},
    label,
    url = process.env.REACT_APP_BACKEND_URL + "/file",
    initId,
    initName,
    onChange = () => {},
  } = props;

  const [file, setFile] = useState<any>();

  useEffect(() => {
    if (initId)
      setFile([
        {
          uid: initId,
          url: `${url}/${initId}`,
          status: "done",
          name: initName,
          response: { fileId: initId },
        },
      ]);
    else setFile([]);
  }, [initId, url, initName]);

  const handleRemove = useCallback(
    (file: UploadFile<any>) => {
      Modal.confirm({
        title: "File will be delete permanently! Are you sure?",
        okText: "Yes",
        cancelText: "No",
        onOk: () => {
          const id = file.response.fileId;
          Axios.delete(`${url}/${id}`, { headers: { token: getToken() } })
            .then(() => {
              message.success("Xóa thành công!");
            })
            .catch((err) => message.error(err.message));
        },
      });
    },[url]);

  useEffect(() => {
    uploadApi({
      reset() {
        setFile([]);
      },
    });
  }, [file, uploadApi, handleRemove]);

  function handleChange({ fileList }: UploadChangeParam<UploadFile<any>>) {
    setFile(fileList);
    onChange(fileList[0]?.response?.fileId);
  }

  return (
    <Form.Item label={label}>
      <Upload
        name={"file"}
        action={url}
        onChange={handleChange}
        onRemove={handleRemove}
        fileList={file}
        headers={{ token: getToken() || "" }}
      >
        <Button disabled={disabled || file?.length} icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Upload>
    </Form.Item>
  );
}
