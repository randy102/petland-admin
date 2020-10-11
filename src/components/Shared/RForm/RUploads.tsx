import React, { useState, useEffect, useCallback } from "react";
import { Form, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as axios from "axios";
import "./ruploads.scss";
import Modal from "antd/lib/modal/Modal";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
import { getToken } from "utils/auth";

const Axios = axios.default;

export interface UploadApi {
  reset: () => void;
  removeAll: () => void;
}

interface RUploadsProps {
  // URL to upload image
  url?: string;

  // URL to load uploaded image
  viewUrl?: string;

  label?: string;
  initIds?: string[];
  disabled?: boolean;
  onChange?: (fileList: string[]) => void;
  uploadApi?: (uploadApi: UploadApi) => void;
}

function getBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (error) => reject(error);
  });
}

export default function RUploads(props: RUploadsProps) {
  const {
    disabled = false,
    uploadApi = () => {},
    label,
    url = process.env.REACT_APP_FILE_POST,
    initIds,
    viewUrl = process.env.REACT_APP_FILE_GET,
    onChange = () => {},
  } = props;

  const [fileList, setFileList] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<any>();

  useEffect(() => {
    if (initIds?.filter(id => id))
      setFileList(
        initIds?.filter(id => id).map((id) => ({
          uid: id,
          url: `${viewUrl}/${id}`,
          status: "done",
          name: id,
          response: { fileId: id },
          type: "image/*",
        }))
      );
  }, [initIds, viewUrl]);
  const handleRemove = useCallback(
    (file: UploadFile<any>) => {
      const id = file.response.fileId;
      Axios.delete(`${url}/${id}`, { headers: { token: getToken() } })
        .then(() => {
          message.success("Xóa thành công!");
        })
        .catch((err) => message.error(err.message));
    },
    [url]
  );

  useEffect(() => {
    uploadApi({
      reset() {
        setFileList([]);
      },
      removeAll() {
        for (let file of fileList) {
          handleRemove(file);
        }
        setFileList(undefined);
      },
    });
  }, [fileList, uploadApi, handleRemove]);

  function handleChange({ fileList }: UploadChangeParam<UploadFile<any>>) {
    const filtered = fileList.filter(
      (file) => file.type.includes("image")
    );
    setFileList(filtered);
    onChange(filtered?.map((file) => file.response?.fileId || "") || []);
  }

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải file JPG/PNG");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Dung lượng ảnh phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  async function handlePreview(file: UploadFile<any>) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setShowModal(true);
  }

  return (
    <Form.Item label={label}>
      <Upload
        disabled={disabled}
        multiple
        accept="image/*"
        name={"file"}
        listType="picture-card"
        className="list-uploader"
        action={url}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        onPreview={handlePreview}
        fileList={fileList}
        headers={{ token: getToken() || "" }}
      >
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <img alt="img" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Form.Item>
  );
}
