import Head from "./components/Head";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPhoto from "./components/MainPhoto";
import MainButton from "./components/MainButton";
import { Route, Routes } from "react-router-dom";

import Separation_Lyrics from "./components/Separation_Lyrics";

import styles from "./app.module.css";
import Separation_Record from "./components/Separation_Record";
import Separation_Upload from "./components/Separation_Upload";

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
      </Routes>
    </div>
  );
}

export default App;
