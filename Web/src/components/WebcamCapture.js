<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './cam-style.css';
const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

=======
import {  useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import {io} from 'socket.io-client';

export const sockets = io('localhost:8000', {
  path: '/sockets/webcam',
  extraHeaders: {
    Authorization: 'hello'
  }
})

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  // const [images, setImages] = useState([]);
>>>>>>> origin/main
  useEffect(() => {
    const captureImages = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
<<<<<<< HEAD
          setImages(prevImages => [...prevImages, imageSrc]);
=======
          // setImages(prevImages => [...prevImages, imageSrc]);
          sockets.emit('sendImage', {data: imageSrc})
>>>>>>> origin/main
        }
      }
    };

    const startCapture = () => {
<<<<<<< HEAD
      const intervalId = setInterval(captureImages, 1000);
=======
      const intervalId = setInterval(captureImages, 66);
>>>>>>> origin/main
      return intervalId;
    };

    const intervalId = setTimeout(() => {
      const id = startCapture();
      return () => clearInterval(id);
    }, 5000);

    return () => clearTimeout(intervalId);
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className='my-webcam'>
=======
  return (
    <div>
>>>>>>> origin/main
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

<<<<<<< HEAD
export default WebcamCapture;
=======
export default WebcamCapture;
>>>>>>> origin/main
