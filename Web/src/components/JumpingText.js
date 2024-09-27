<<<<<<< HEAD
import React from 'react';
import './components.css';
const JumpingText = () => {
    // const [haveTest,setHaveTest] = [false]
    return (
      <div className="text-move">
        Hello, World!
      </div>
    );
  };
  
  export default JumpingText;
=======
import React, { useEffect, useState } from 'react';
import './components.css';
import { sockets } from './WebcamCapture';

const JumpingText = () => {
    const [results, setResults] = useState([]);
    const [haveData, setHaveData] = useState(false);

    useEffect(() => {
        sockets.on('donePredict', (data) => {
            if (data) {
                setResults(prevResults => [...prevResults, data]);
                setHaveData(true);
                console.log(data)
            }
        });
    }, []);

    return (
        <div className="text-move">
            {haveData && (
                <div>
                    {results.map((item, index) => (
                        <span key={index}>{item.res}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JumpingText;
>>>>>>> origin/main
