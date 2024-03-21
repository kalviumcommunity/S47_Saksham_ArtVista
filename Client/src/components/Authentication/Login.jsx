import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import lscss from './loginsignup.module.css'
import Axios from 'axios';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitLogin(e) {
    e.preventDefault();

    Axios.post('http://localhost:3000/api/login', {
      username,
      password,
    })
      .then((response) => {
        console.log(response);
        console.log('Login success');
      })
      .catch((error) => {
        console.log(error);
        console.log('Login failed');
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
        </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login;