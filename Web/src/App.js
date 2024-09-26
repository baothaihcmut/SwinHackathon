import React from 'react';
import './project.css';
import BreadCrumb from './components/BreadCrumb';
import UserSwitch from './components/UserSwitch';
import CameraButton from './components/CameraButton.js';
import LoginButton from './components/LoginButton.js';
import Response from './components/Response.js';

function App() {
  return (
    <div>
      <header>
          <h2></h2>
          <h2 className="name">Binariers</h2>
          <div className='bar'>        
          <BreadCrumb></BreadCrumb>
          <LoginButton></LoginButton>
          </div>
      </header>
      <div className="switch">
        <UserSwitch></UserSwitch>
      </div>
      <div className="wrapper"> 
      <div className="camera-submit">
        <h2 className="camera-text">Record your camera video</h2>
        <CameraButton></CameraButton>
      </div>
      </div>
      <div className="res">
        <Response></Response>
      </div>

    </div>

  );
}

export default App;
