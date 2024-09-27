import React, { useEffect, useState } from 'react';
import './components.css';
;

const JumpingText = ({ setHaveData }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        sockets.on('donePredict', (data) => {
            if (data) {
                setResults(prevResults => [...prevResults, data]);
                setHaveData(true);
            }
        });
    }, [setHaveData]);

    return (
        <div className="text-move">
            {results.length > 0 && (
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
