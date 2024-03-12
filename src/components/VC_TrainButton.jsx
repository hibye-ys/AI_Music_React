import React, { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import styles from "./vc_trainbutton.module.css";

const VC_TrainButton = () => {
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
          Train
        </Button>
      </Flex>
      <div className={styles.Text}>
        <p>Train 하는데 2시간정도의 시간이 걸립니다</p>
        <p>Train Status 버튼을 눌러 상태를 확인하세요</p>
      </div>
      <div className={styles.TrainStatus}>
        <button>Train 상태 확인</button>
      </div>
    </div>
  );
};
export default VC_TrainButton;
