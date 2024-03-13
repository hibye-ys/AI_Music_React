import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const customRequest = (options) => {
  const { onSuccess, onError, file, onProgress } = options;
  const formData = new FormData();
  formData.append("user_id", "123");
  formData.append("artist", "daftpunk");
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://0.0.0.0:5000/vc_training", true);
  xhr.timeout = 300000; // 타임아웃을 30초로 설정

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      onSuccess("Upload success");
    } else {
      onError("Upload failed");
    }
  };

  xhr.ontimeout = () => {
    message.error("Upload timed out");
    onError("Upload timed out");
  };

  xhr.onerror = () => {
    message.error("Upload failed");
    onError("Upload failed");
  };

  xhr.send(formData);
};

const props = {
  name: "file",
  multiple: true,
  customRequest,
  onChange(info) {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const VC_Upload = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading
      company data or other banned files.
    </p>
  </Dragger>
);

export default VC_Upload;
