import React, { useState, useEffect } from "react";
import { Form, Upload, message, Button } from "antd";
import ImgCrop from "antd-img-crop";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import * as axios from "axios";
import "./rupload.scss";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import { getToken } from "utils/auth";

const Axios = axios.default;

interface UploadApi {
  reset: () => void;
}

interface RUploadProps {
  // URL to upload image
  url: string;

  // URL to load uploaded image
  viewUrl: string;

  crop: boolean;
  cropShape: "round" | "rect";
  label?: string;
  initId?: string;
  disabled: boolean;
  onChange?: (uploadedId: string | undefined) => void;
  uploadApi?: (uploadApi: UploadApi) => void;
}

export default function RUpload(props: RUploadProps) {
  const {
    crop = true,
    cropShape = "round",
    disabled = false,
    uploadApi = () => {},
    label,
    url = process.env.REACT_APP_FILE_POST || "",
    initId,
    viewUrl = process.env.REACT_APP_FILE_GET,
    onChange = () => {},
  } = props;

  const [imageId, setImageId] = useState(initId);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => setImageId(initId), [initId]);

  useEffect(() => {
    uploadApi({
      reset() {
        setImageId(undefined);
      },
    });
  }, [uploadApi]);

  function handleChange(info: UploadChangeParam<UploadFile<any>>) {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setImageId(info.file.response?.fileId);
      setLoading(false);
      onChange(info.file.response?.fileId);
    }
  }

  function handleRemove() {
    Axios.delete(`${url}/${imageId}`, {headers: {token: getToken()}})
      .then(() => {
        message.success("Xóa thành công!");
        setImageId(undefined);
        onChange(undefined);
      })
      .catch((err) => message.error(err.message));
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  function renderUpload() {
    if (crop)
      return (
        <ImgCrop shape={cropShape} rotate>
          <Upload
            name={"file"}
            listType="picture-card"
            className="avatar-uploader"
            disabled={!!(imageId || disabled)}
            showUploadList={false}
            action={url}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={{token: getToken() || ""}}
          >
            {imageId ? (
              <img
                src={`${viewUrl}/${imageId}`}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      );
    return (
      <Upload
        name={"file"}
        listType="picture-card"
        className="avatar-uploader"
        disabled={!!imageId}
        showUploadList={false}
        action={url}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageId ? (
          <img
            src={`${viewUrl}/${imageId}`}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }

  return (
    <Form.Item label={label}>
      {imageId && (
        <Button
          style={{ marginBottom: 10, display: disabled ? "none" : "block" }}
          danger
          onClick={handleRemove}
          icon={<DeleteOutlined />}
        >
          Xóa ảnh
        </Button>
      )}

      {renderUpload()}
    </Form.Item>
  );
}
