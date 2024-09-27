import React, { useEffect, useState } from 'react';

import './project.css';
import BreadCrumb from './components/BreadCrumb';
import UserSwitch from './components/UserSwitch';
import CameraButton from './components/CameraButton.js';
import LoginButton from './components/LoginButton.js';
import Response from './components/Response.js';

function App() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    // Parse the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    if (token) {
        setIsLogin(true); // Store the access token in state
        localStorage.setItem('access_token',token) // You can use it here or store it in localStorage
    }
}, []);
  return (
    <div>
      <header>
          <h2></h2>
          <h2 className="name">Binariers</h2>
          <div className='bar'>        
          <BreadCrumb></BreadCrumb>
          {!isLogin && <LoginButton></LoginButton>}
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
