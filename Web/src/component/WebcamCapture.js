import { useState } from 'react';
import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const captureImages = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImages([...images, imageSrc]);
        console.log(imageSrc);
      }
    }
    const startCapture = () => {setInterval(captureImages, 33);}
    setTimeout(startCapture, 4000);
  }, []);


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

export default WebcamCapture;
