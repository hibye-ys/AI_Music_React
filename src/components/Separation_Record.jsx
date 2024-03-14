import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordRTC from "recordrtc";
import axios from "axios";
import styles from "./separation_record.module.css";

const WaveformRecorder = () => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [latestRecording, setLatestRecording] = useState(null);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop the recording
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        setLatestRecording({ url, blob });
        if (wavesurfer) {
          wavesurfer.loadBlob(blob);
        }
      });
      setIsRecording(false);
    } else {
      // Start a new recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const newRecorder = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/wav",
          recorderType: RecordRTC.StereoAudioRecorder,
          numberOfAudioChannels: 1,
          sampleRate: 48000,
          timeSlice: 1000,
          onTimeStamp: function (timestamp) {},
        });
        newRecorder.startRecording();
        setRecorder(newRecorder);
        setIsRecording(true);
      });
    }
  };

  useEffect(() => {
    const newWavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "violet",
      progressColor: "purple",
    });

    setWavesurfer(newWavesurfer);

    return () => {
      if (newWavesurfer) {
        newWavesurfer.destroy();
      }
    };
  }, []);

  const playAudio = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div>
      <div id="waveform"></div>
      <button className={styles.recording} onClick={toggleRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button className={styles.PlayPause} onClick={playAudio}>
        Play/Pause
      </button>
      {latestRecording && (
        <button className={styles.Download}>
          <a href={latestRecording.url} download="recording.wav">
            Download
          </a>
        </button>
      )}
    </div>
  );
};

export default WaveformRecorder;
