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
  useEffect(() => {
    const captureImages = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          // setImages(prevImages => [...prevImages, imageSrc]);
          sockets.emit('sendImage', {data: imageSrc})
        }
      }
    };

    const startCapture = () => {
      const intervalId = setInterval(captureImages, 66);
      return intervalId;
    };

    const intervalId = setTimeout(() => {
      const id = startCapture();
      return () => clearInterval(id);
    }, 5000);

    return () => clearTimeout(intervalId);
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