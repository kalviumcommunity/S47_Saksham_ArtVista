import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import scss from './SetUser.module.css';
import Cookies from 'js-cookie';

function SetUser() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [existingUsernames, setExistingUsernames] = useState([]);
  const [email, setEmail] = useState(''); 
  const [UserName, setUserName] = useState('');

  useEffect(() => {
    const UserToken = Cookies.get('auth');
    if (!UserToken) {
      window.location.href = '/auth/login';
    } else {
      Axios.post(`${import.meta.env.VITE_BACKEND}/verifyuser`, {
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserToken}` 
        }
      })
      .then(response => {
        setEmail(response.data.user.email);
        setUserName(response.data.user.username);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });

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
      Cookies.set('av-username', username);
      navigateTo('/auth/editauth');
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/setuser`, { username, email: email });
      setMessage(response.data.message);
      const token = response.data.token;
      Cookies.set('auth', token);
      setError('');
    } catch (error) {
      console.error('Error setting username:', error);
      setMessage('');
      setError(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <>
    <div className={scss.fullpage}>
    <button className={scss.Backbtn} onClick={() => navigateTo('/auth/editauth')}>{"< Back"}</button>
      <div className={scss.formcont}>
      <form className={scss.form}>
        <div className={scss.title}>Set your new Username</div>
        <div className={scss.msg}><p>You have logged in as</p><pe>{email}</pe></div>
        {
          UserName ? 
          <div className={scss.msg}><p>Your current Username is:</p><pe>{UserName}</pe></div> 
          : 
          <div className={scss.msg}>Set a new Username to proceed</div>
        }
        <div className={scss.inputcont}>
          <input
          className={scss.inputuser}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
            />
            {!error && username && <button onClick={handleSubmit}>Use this ?</button>}
        </div>
        {error && <div className={scss.message} style={{ color: 'red' }}>{error}</div>}
        {!error && username && <div className={scss.message} style={{ color: 'green' }}>Username available</div>}
      </form>
      </div>
    </div>
    </>
  );
}

export default SetUser;
