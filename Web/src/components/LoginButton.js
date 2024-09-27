import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './components.css';
import {GoogleOutlined } from '@ant-design/icons';
const LoginButton = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  // Check for the logged-in user on component mount

  

  // Handle login
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google'; // Redirect to Google login
  };

  // Handle logout
  const handleLogout = () => {

    axios.get('http://localhost:3000/api/logout', { withCredentials: true })
      .then(() => {
        setUser(null); // Clear user data
        setAccessToken(''); // Clear access token
      });
  };

  // Optionally, handle the response from the backend when redirecting

  return (
    <div className="App">
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photos[0].value} alt="Profile" />
          <p>Access Token: {accessToken}</p>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className='login-popup'>Login with <GoogleOutlined/> </button>
      )}
    </div>
  );
}

export default LoginButton;