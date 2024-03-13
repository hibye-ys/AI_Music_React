import React, { useState } from "react";
import axios from "axios";
import styles from "./vc_inference_upload.module.css";

function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("artist", "daftpunk");
    formData.append("user_id", "123");
    for (let i = 0; i < files.length; i++) {
      formData.append("audio", files[i]);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    axios
      .post("http://localhost:5000/vc_inference", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className={styles.btnupload}>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <div className={styles.button}>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default FileUpload;
