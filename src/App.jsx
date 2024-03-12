import Head from "./components/Head";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPhoto from "./components/MainPhoto";
import MainButton from "./components/MainButton";
import { Route, Routes } from "react-router-dom";

import Separation_Lyrics from "./components/Separation_Lyrics";

import styles from "./app.module.css";
import Separation_Record from "./components/Separation_Record";
import Separation_Upload from "./components/Separation_Upload";
import VC_Upload from "./components/VC_Upload";
import VC_TrainButton from "./components/VC_TrainButton";
import VC_InferencTab from "./components/VC_InferencTab";
import VC_Wave from "./components/VC_Wave";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Head />
              <MainPhoto />
              <MainButton />
            </>
          }
        />
        <Route
          path="/separation"
          element={
            <>
              <Head />
              <Separation_Upload />
              <Separation_Record />
            </>
          }
        />
        <Route
          path="/VCtrain"
          element={
            <>
              <Head />
              <VC_Upload />
              <VC_TrainButton />
            </>
          }
        />
        <Route
          path="/VCinference"
          element={
            <>
              <Head />
              <VC_Upload />
              <VC_InferencTab />
              <VC_Wave />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
