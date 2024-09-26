import { useState } from 'react';
import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamSetup = () => {
    const webcamRef = useRef(null);
    const [images, setImages] = useState([]);
    const useEffect = () => {
      const captureImages = () => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          setImages([...images, imageSrc]);
        }
      }
      setInterval(captureImages,33); 
    }
    return (
        <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
      </div>
    );
};

export default WebcamSetup;