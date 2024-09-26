import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './cam-style.css';
const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const captureImages = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          setImages(prevImages => [...prevImages, imageSrc]);
        }
      }
    };

    const startCapture = () => {
      const intervalId = setInterval(captureImages, 1000);
      return intervalId;
    };

    const intervalId = setTimeout(() => {
      const id = startCapture();
      return () => clearInterval(id);
    }, 5000);

    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className='my-webcam'>
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
