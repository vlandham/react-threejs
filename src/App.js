import React from "react";
import World from "./World";
import "./App.css";

const data = [];

function App() {
  const worldRef = React.useRef();
  const handleResetCamera = () => {
    worldRef.current.resetCamera();
  };
  return (
    <div className="App">
      <div className="world-container">
        <World ref={worldRef} data={data} />
      </div>
      <button className="reset-button" onClick={handleResetCamera}>
        Reset Camera
      </button>
    </div>
  );
}

export default App;
