import React, { useState } from 'react';
import './components.css';
import JumpingText from './JumpingText';
const Response = () => {
    const [haveData, setHaveData] = useState(false);
    return (
        <div className={`res ${haveData ? 'visible' : ''}`}>
            <JumpingText setHaveData={setHaveData} />
        </div>
    );
};

export default Response;