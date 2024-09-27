import React, { useEffect, useState } from 'react';
import './project.css';
import BreadCrumb from './components/BreadCrumb';
import UserSwitch from './components/UserSwitch';
import CameraButton from './components/CameraButton.js';
import OtherCam from './components/OtherCam.js';
import LoginButton from './components/LoginButton.js';
import Response from './components/Response.js';
import UploadForm from './components/UploadForm';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [haveData, setHaveData] = useState(false);
  const [selectedRole, setSelectedRole] = useState('1'); // Default to 'User'

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    if (token) {
      setIsLogin(true);
      localStorage.setItem('access_token', token);
    }
  }, []);

  const handleRoleSelect = (key) => {
    setSelectedRole(key);
  };

  return (
    <>
      <header>
        <h2></h2>
        <h2 className="name">Binariers</h2>
        <div className="bar">
          <BreadCrumb />
          {!isLogin && <LoginButton />}
        </div>
      </header>
      <div className="switch">
        <UserSwitch onSelect={handleRoleSelect} />
      </div>
      <div className="wrapper">
        {selectedRole === '1' ? (
          <div className="camera-submit">
            <h2 className="camera-text">Record your camera video</h2>
            <CameraButton />
            <div className={`res ${haveData ? 'visible' : ''}`}>
              <Response setHaveData={setHaveData} />
            </div>
          </div>
        ) : (
          <div className="camera-submit">
            <h2 className="camera-text">Record your camera video</h2>
            <h2 className="camera-text" style={{ fontStyle: 'italic', marginTop: '20px' }}>
              <u>to help us develop our system</u>
            </h2>
            <OtherCam />
          </div>
        )}
      </div>
    </>
  );
  
}

export default App;
