import React, { useState, useRef, useEffect } from "react";
import styles from "./separation_status.module.css";
import axios from "axios";
import WaveSurfer from "wavesurfer.js";

function Separation_Status() {
  const [selectedFile, setSelectedFile] = useState(null);
  const waveformVocalRef = useRef(null);
  const waveformInstrumRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [audioUrls, setAudioUrls] = useState({ vocal: "", instrum: "" });
  const [isVocalLoaded, setIsVocalLoaded] = useState(false);
  const [isInstrumLoaded, setIsInstrumLoaded] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const requestData = {
    user_id: "123",
    artist: "daftpunk",
    filename: "Get_Lucky.wav",
  };

  const handleStatusCheck = async () => {
    const response = await axios.post(
      "http://localhost:5000/download",
      requestData
    );
    console.log(response);

    setStatus(response.data.status);
    setAudioUrls({
      vocal: response.data.vocal,
      instrum: response.data.instrum,
    });

    if (response.data.status === "Completed") {
      waveformVocalRef.current.load(response.data.vocal);
      waveformInstrumRef.current.load(response.data.instrum);
    }
  };

  useEffect(() => {
    if (status === "Completed") {
      waveformVocalRef.current = WaveSurfer.create({
        container: "#waveform-vocal",
        waveColor: "violet",
        progressColor: "purple",
      });

      waveformInstrumRef.current = WaveSurfer.create({
        container: "#waveform-instrum",
        waveColor: "green",
        progressColor: "darkgreen",
      });
      waveformVocalRef.current.on("ready", () => setIsVocalLoaded(true));
      waveformInstrumRef.current.on("ready", () => setIsInstrumLoaded(true));
      waveformVocalRef.current.load(audioUrls.vocal);
      waveformInstrumRef.current.load(audioUrls.instrum);

      return () => {
        waveformVocalRef.current.destroy();
        waveformInstrumRef.current.destroy();
      };
    }
    // 의존성 배열에 status와 audioUrls를 추가합니다.
  }, [status, audioUrls.vocal, audioUrls.instrum]);

  const togglePlayPause = (waveformRef, isLoaded) => {
    if (isLoaded && waveformRef.current) {
      waveformRef.current.playPause();
    }
  };

  return (
    <div>
      <div className={styles.StatusButton}>
        <button onClick={handleStatusCheck} className={styles.button}>
          상태확인하기
        </button>
        <div className={styles.processing}>{status}</div>
        {status === "Completed" && (
          <>
            <div id="waveform-vocal" ref={waveformVocalRef}></div>
            <button
              className={styles.PlayPause}
              onClick={() => togglePlayPause(waveformVocalRef, isVocalLoaded)}
            >
              Play/Pause
            </button>
            <a className={styles.Download} href={audioUrls.vocal} download>
              Download
            </a>

            <div id="waveform-instrum" ref={waveformInstrumRef}></div>
            <button
              className={styles.PlayPause}
              onClick={() =>
                togglePlayPause(waveformInstrumRef, isInstrumLoaded)
              }
            >
              Play/Pause
            </button>
            <a className={styles.Download} href={audioUrls.instrum} download>
              Download
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Separation_Status;
