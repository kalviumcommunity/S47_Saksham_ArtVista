import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import lscss from './loginsignup.module.css'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import Cookies from 'js-cookie';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  // Cookie.set('userEmail', user.email)

  function loginWithGoogle() {
    loginWithRedirect({
      screen_hint: 'login',
      connection: 'google-oauth2',
    });
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('loggedInUser', JSON.stringify({ username: user.email }));
    }
  }, [isAuthenticated, user]);
  
  function submitLogin(e) {
    e.preventDefault();

    Axios.post(import.meta.env.VITE_USERLOGIN, {
      username,
      password,
    })
      .then((response) => {
        console.log(response);
        console.log('Login success');
        // localStorage.setItem('loggedInUser', JSON.stringify({ username }));
        const { token } = response.data; 
        localStorage.setItem('loggedInUser', JSON.stringify({ token, username }));
        navigateTo('/');
      })
      .catch((error) => {
        console.log(error);
        console.log('Login failed');
        alert('The username or password is incorrect');
      });
  }
  

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <>
    <div className={`${lscss.fullpage}`}>
    <Link to="/"><button className={`${lscss.Backbtn}`}>Back</button></Link>
    <br /><br /><br /><br /><br />
    <div className={`${lscss.container}`}>
    <div className={`${lscss.welcome}`}>
        <h1>Hello {username || 'User'} !</h1>
        <p>You're on the only Enthusiastic platform to browse and share your talent</p>
        <p>Get Started by filling this form and login quickly</p>
        <p>Not already registered ? <Link to="/auth/signup">Signup</Link></p>
      </div>
    <div className={`${lscss.signup}`}>
        <h2>Login</h2>
        <form className={`${lscss.form}`} action="">
            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="username">Username:</label>
              <input
              className={`${lscss.inputbox}`}  
              type='text' 
              placeholder='test@test.com'
              onChange={handleUsernameChange}
              />
            </div>
            
            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="password">Password:</label>
              <input
              className={`${lscss.inputbox}`}  
              type='text' 
              placeholder='******'
              onChange={handlePasswordChange}
              />
            </div>

            <div>
            <button  onClick={submitLogin}  className={`${lscss.submitbtn}`} type='submit'>Login</button>
            <Link to="/auth/signup"><button className={`${lscss.sidebtn}`}>Not Registered yet ?</button></Link>
            </div>
            <div>
              <button onClick={() => loginWithGoogle()}>Log In using google ?</button>;
            </div>
        </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login;