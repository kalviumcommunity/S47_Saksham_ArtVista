import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import scss from './SetUser.module.css';

function SetUser() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [existingUsernames, setExistingUsernames] = useState([]);
  const email = localStorage.getItem('UserEmail');

  const navigateTo = useNavigate();

  useEffect(() => {
    fetchExistingUsernames();
  }, []);

  const fetchExistingUsernames = async () => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND}/useravail`);
      setExistingUsernames(response.data);
    } catch (error) {
      console.error('Error fetching existing usernames:', error);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    setMessage('This username is availabe');
    checkUsernameAvailability(e.target.value);
  };

  const checkUsernameAvailability = (newUsername) => {
    if (existingUsernames.includes(newUsername)) {
      setError('Username is already taken. Please choose a different username.');
      setMessage('');
    } else {
      setError('');
    }
  };

  const handleSubmit = async () => {
    try {
      localStorage.setItem('Username', username);
      navigateTo('/');
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/setuser`, { username, email: email });
      setMessage(response.data.message);
      const token = response.data.token;
      localStorage.setItem('UserToken', token);
      setError('');
    } catch (error) {
      console.error('Error setting username:', error);
      setMessage('');
      setError(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <>
      <form className={scss.form}>
        <div>Set Username</div>
        <div>You have logged in as {email}</div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleChange}
        />
        {/* {error && <div style={{ color: 'red' }}>{error}</div>}
        {message && <div style={{ color: 'green' }}>{message}</div>}
        <button onClick={handleSubmit}>Submit</button> */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!error && username && <div style={{ color: 'green' }}>Username available</div>}
        {!error && username && <button onClick={handleSubmit}>Submit</button>}
      </form>
    </>
  );
}

export default SetUser;
