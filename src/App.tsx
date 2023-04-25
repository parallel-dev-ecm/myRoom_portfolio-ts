import { useState } from "react";
import "./App.css";
import Main_scene from "./Components/Main_scene";

function App() {
  return (
    <>
      <div
        className="mainTHREEscene"
        style={{ height: "100vh", width: "100%" }}
      >
        <Main_scene />
      </div>
    </>
  );
}

export default App;
