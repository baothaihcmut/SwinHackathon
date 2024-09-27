import React from 'react';
import { useState } from 'react';
import "./cam-style.css";
import WebcamCapture from './WebcamCapture';
import Finish from './Finish';

const CameraButton = () => {
  const [showWebcam,setShowWebcam] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [visualCountdown, setVisualCountdown] = useState(true);
  const [showFinishButton, setShowFinishButton] = useState(false);

  const handleCLick = () => {
    setShowWebcam(true);
    startCountdown();
  };

  const startCountdown = () => {
    let counter = 4;
    const intervalId = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(intervalId);
        setVisualCountdown(false);
        setTimeout(() => {
          setShowFinishButton(true);
        }, 1000); 
      }
    }, 1000);
  };
  const handleFinish = () => {
    setShowWebcam(false);
    setShowFinishButton(false);
    setCountdown(4);
    setVisualCountdown(true);
    window.location.reload();
  };

  return (
    <div className='mycamera'>
    {showWebcam && <div className="blur-background"></div>}
    <div className={`camera-layer ${showWebcam ? 'move-up' : ''}`}>
      {!showWebcam && (
        <button onClick={handleCLick} className='camera-start'>
          Start
        </button>
      )}
      {showWebcam && <WebcamCapture />}
      {showWebcam && visualCountdown && (
        <div className='text-alert'>You have {countdown} seconds</div>
      )}
      {showWebcam && showFinishButton && <Finish onFinish={handleFinish} />}
    </div>
  </div>
  );
};

export default CameraButton;