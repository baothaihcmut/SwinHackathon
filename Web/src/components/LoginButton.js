import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './components.css';
const LoginButton = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  // Check for the logged-in user on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/current_user', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null); // Not logged in
      });
  }, []);

  // Handle login
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // Redirect to Google login
  };

  // Handle logout
  const handleLogout = () => {
    axios.get('http://localhost:5000/api/logout', { withCredentials: true })
      .then(() => {
        setUser(null); // Clear user data
        setAccessToken(''); // Clear access token
      });
  };

  // Optionally, handle the response from the backend when redirecting
  const handleResponse = async () => {
    const response = await axios.get('http://localhost:5000/auth/google/callback', { withCredentials: true });
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);  
  };
  handleResponse();
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
        <button onClick={handleLogin} className='login-popup'>Login with Google</button>
      )}
    </div>
  );
}

export default LoginButton;