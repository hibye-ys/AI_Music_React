import React, { useState, useEffect, useRef } from "react";
import {
  PoweroffOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import styles from "./vc_inferencetab.module.css";

const VC_InferenceTab = () => {
  const [loadings, setLoadings] = useState([]);
  const [audioUrl1, setAudioUrl1] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef1 = useRef(null);
  const wavesurfer1 = useRef(null);

  const [audioUrl2, setAudioUrl2] = useState("");
  const waveformRef2 = useRef(null);
  const wavesurfer2 = useRef(null);

  useEffect(() => {
    wavesurfer1.current = WaveSurfer.create({
      container: waveformRef1.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "transparent",
      height: 300,
    });

    wavesurfer2.current = WaveSurfer.create({
      container: waveformRef2.current,
      waveColor: "blue",
      progressColor: "green",
      cursorColor: "transparent",
      height: 300,
    });

    wavesurfer1.current.on("play", () => setIsPlaying(true));
    wavesurfer1.current.on("pause", () => setIsPlaying(false));
    wavesurfer1.current.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurfer1.current.destroy();
      wavesurfer2.current.destroy();
    };
  }, []);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    const postData = {
      user_id: "123",
      artist: "daftpunk",
      filename: "Get_Lucky.wav",
    };
    axios
      .all([
        axios.post("http://localhost:5000/vc_inference_check", postData),
        axios.post("http://localhost:5000/download", postData),
      ])
      .then(
        axios.spread((response1, response2) => {
          const audioUrl1 = response1.data;
          const audioUrl2 = response2.data.instrum;
          console.log("Response 1", response1.data);
          console.log("Response 2", response2.data.instrum);
          setAudioUrl1(audioUrl1);
          setAudioUrl2(audioUrl2);
          wavesurfer1.current.load(audioUrl1);
          wavesurfer2.current.load(audioUrl2);
        })
      )
      .catch((error) => {
        message.error("Voice conversion failed.");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      });
  };

  const handlePlayPause = () => {
    wavesurfer1.current.playPause();
    wavesurfer2.current.playPause();
  };

  const downloadAudio = () => {
    if (!audioUrl1) {
      message.error("No audio loaded!");
      return;
    }

    const a = document.createElement("a");
    a.href = audioUrl1;
    a.download = "downloaded_audio.wav"; // 또는 서버로부터 받은 파일 이름
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAudio2 = () => {
    if (!audioUrl2) {
      message.error("No audio loaded!");
      return;
    }

    const a = document.createElement("a");
    a.href = audioUrl2;
    a.download = "downloaded_audio_2.wav"; // 또는 서버로부터 받은 파일 이름
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.Button}>
      <Button
        type="primary"
        icon={<PoweroffOutlined />}
        loading={loadings[1]}
        onClick={() => enterLoading(1)}
      >
        Start Voice Conversion
      </Button>

      <div className={styles.audioContainer}>
        <div
          className={styles.waveform}
          ref={waveformRef1}
          onClick={handlePlayPause}
          style={{ cursor: "pointer" }}
        />
        {audioUrl2 && (
          <div className={styles.controls}>
            <Button
              icon={
                isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
              }
              onClick={handlePlayPause}
            >
              {isPlaying ? "Pause" : "Play"} 1
            </Button>
            <Button icon={<DownloadOutlined />} onClick={downloadAudio}>
              Download 1
            </Button>
          </div>
        )}
      </div>

      <div className={styles.audioContainer}>
        <div
          className={styles.waveform}
          ref={waveformRef2}
          onClick={handlePlayPause}
          style={{ cursor: "pointer" }}
        />
        {audioUrl2 && (
          <div className={styles.controls}>
            <Button
              icon={
                isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
              }
              onClick={handlePlayPause}
            >
              {isPlaying ? "Pause" : "Play"} 2
            </Button>
            <Button icon={<DownloadOutlined />} onClick={downloadAudio2}>
              Download 2
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default VC_InferenceTab;
