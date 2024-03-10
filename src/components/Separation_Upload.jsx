import React, { useState, useRef, useEffect } from "react";
import styles from "./separation_upload.module.css";
import axios from "axios";
import WaveSurfer from "wavesurfer.js";

function Separation_Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const waveformVocalRef = useRef(null);
  const waveformInstrumRef = useRef(null);



  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("artist", "daftpunk");
    formData.append("user_id", "123");
    formData.append("audio", selectedFile);


    console.log("Uploading", selectedFile);
    axios.post("http://localhost:5000/separate", formData,  {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );
  };


  const [status, setStatus] = useState('');
  const [audioUrls, setAudioUrls] = useState({vocal:"", instrum:""});

  const requestData = {
    user_id: "123",
    artist: "daftpunk",
    filename: "Get_Lucky.wav"
  }

  const handleStatusCheck = async () => {
    const response = await axios.post('http://localhost:5000/download', requestData);
    console.log(response)

  
    setStatus(response.data.status);
    setAudioUrls({ vocal: response.data.vocal, instrum: response.data.instrum });

    if (response.data.status === 'Completed') {
      waveformVocalRef.current.load(response.data.vocal);
      waveformInstrumRef.current.load(response.data.instrum);
    }
}


  useEffect(() => {
    waveformVocalRef.current = WaveSurfer.create({
      container: '#waveform-vocal',
      waveColor: 'violet',
      progressColor: 'purple',
    });

    waveformInstrumRef.current = WaveSurfer.create({
      container: '#waveform-instrum',
      waveColor: 'green',
      progressColor: 'darkgreen',
    });

    return () => {
 
      waveformVocalRef.current.destroy();
      waveformInstrumRef.current.destroy();
    };
  }, []);



  const togglePlayPause = (waveformRef) => {
    if (waveformRef.current) {
      waveformRef.current.playPause();
    }
  };



  return (
    <div>
      <h1 className={styles.HeadText}>파일을 업로드 하세요</h1>
      <div className={styles.UploadButton}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div className={styles.StatusButton}>
        <button onClick={handleStatusCheck} className={styles.button}>상태확인하기</button>  
        <div className={styles.processing}>{status}</div>
        <div id="waveform-vocal" ref={waveformVocalRef}></div>
        <button onClick={() => togglePlayPause(waveformVocalRef)}>Vocal Play/Pause</button>
        <a href={audioUrls.vocal} download>Download VocaL</a>
        <div id="waveform-instrum" ref={waveformInstrumRef}></div>
        <button onClick={() => togglePlayPause(waveformInstrumRef)}>Instrum Play/Pause</button>
        <a href={audioUrls.instrum} download>Download instrument</a>
      </div>
    </div>
  );
}

export default Separation_Upload;
