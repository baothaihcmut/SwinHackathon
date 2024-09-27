import React, { useEffect, useState } from 'react';
import './components.css';
import { sockets } from './WebcamCapture';

const JumpingText = ({ setHaveData }) => {
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);

  useEffect(() => {
    sockets.on('donePredict', (data) => {
      if (data) {
        setResults(prevResults => [...prevResults, data]);
        setHaveData(true);
        console.log(data);
      }
    });
  }, [setHaveData]);

  useEffect(() => {
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      setDisplayedResults(prevDisplayedResults => [...prevDisplayedResults, lastResult]);
    }
  }, [results]);

  return (
    <div className="text-move">
      {displayedResults.map((item, index) => (
        <span key={index} className='text-item'>{item.res}</span>
      ))}
    </div>
  );
};

export default JumpingText;
