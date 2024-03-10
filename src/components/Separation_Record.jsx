import styles from "./separation_record.module.css";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";


const Separation_Record = () => {
  const waveformRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);


  const startRecording = () => {
    if (!waveformRef.current) {
        waveformRef.current = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            plugins: [
                Recorder.create({
                    audioType: 'audio/wav'
                })
            ]
        });

        waveformRef.current.on('finishRecord', (blob) => {
            setAudioBlob(blob);
        });
    }

    waveformRef.current.recorder.start();
    setIsRecording(true);
};

const stopRecording = () => {
    waveformRef.current.recorder.stop();
    setIsRecording(false);
};




return (
  <div>
      <div id="waveform"></div>
      {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
      ) : (
          <button onClick={startRecording}>Start Recording</button>
      )}
      {audioBlob && <button onClick={uploadToS3}>Upload to S3</button>}
  </div>
);
};





export default Separation_Record;
