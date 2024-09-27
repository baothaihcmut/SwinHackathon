import React from 'react';
import './components.css';
import JumpingText from './JumpingText';

const Response = ({ setHaveData }) => {
  return (
    <div className='res-pond'>
      <JumpingText setHaveData={setHaveData} />
    </div>
  );
};

export default Response;
