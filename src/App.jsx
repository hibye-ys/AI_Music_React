import Head from "./components/Head";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPhoto from "./components/MainPhoto";
import MainButton from "./components/MainButton";
import { Route, Routes } from "react-router-dom";

import Separation_Lyrics from "./components/Separation_Lyrics";

import styles from "./app.module.css";
import Separation_Record from "./components/Separation_Record";
import Separation_Upload from "./components/Separation_Upload";
import VC_Train_Upload from "./components/VC_Train_Upload";
import VC_TrainButton from "./components/VC_TrainButton";
import VC_InferencTab from "./components/VC_InferencTab";
import VC_Inference_Upload from "./components/VC_Inference_Upload";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={styles.Main}>
                <Head />
                <MainPhoto />
                <MainButton />
              </div>
            </>
          }
        />
        <Route
          path="/separation"
          element={
            <>
              <div className={styles.separation}>
                <Head />
                <Separation_Upload />
                <Separation_Record />
              </div>
            </>
          }
        />
        <Route
          path="/VCtrain"
          element={
            <>
              <Head />
              <VC_Train_Upload />
              <VC_TrainButton />
            </>
          }
        />
        <Route
          path="/VCinference"
          element={
            <>
              <Head />
              <VC_Inference_Upload />
              <VC_InferencTab />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
