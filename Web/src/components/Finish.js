import React from 'react';
import './cam-style.css';
const Finish = ({ onFinish }) => {
  return (
    <button onClick={onFinish} className='finish-button'>
      Finish
    </button>
  );
};

export default Finish;
