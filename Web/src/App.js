import './App.css';
import React from 'react';
import WebcamCapture from './component/WebcamCapture';
import { useState } from 'react';
import WebcamSetup from './component/WebcamSetup';
import "./component/cam-style.css";
function App() {
  const [showWebcam,setShowWebcam] = useState(false);
  const handleCLick = () => {
    setShowWebcam(true);
  };
  // const handleCamera = () => {
  //   Effect();
  // }
  return (
    <div className="App">
    <button onClick={handleCLick}> Start </button>
      {showWebcam&&<WebcamCapture></WebcamCapture>}
        {/* <div className='camera-layer'>  */}

        {/* <button className="camera" >Start Camera</button>
        </div> */}
        {showWebcam && <div>You have 4 seconds </div>}

      </div>
  );
}

export default App;
