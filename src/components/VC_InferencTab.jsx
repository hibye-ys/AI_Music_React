import React, { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import styles from "./vc_trainbutton.module.css";

const VC_InferencTab = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <div className={styles.Button}>
      <Flex gap="small" wrap="wrap">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Start Voice Conversion
        </Button>
      </Flex>

      <div className={styles.TrainStatus}>
        <button>Train 상태 확인</button>
      </div>
    </div>
  );
};
export default VC_InferencTab;
