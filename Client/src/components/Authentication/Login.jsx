import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import lscss from './loginsignup.module.css'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Gauth from './gauth';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();  
  const [errors, setErrors] = useState([]);

  // direct log in by posting data in mongodb
  function submitLogin(e) {
    e.preventDefault();

    if (username == '' || password == '') {
      setErrors(['Username and password are required.'])
      return;
    } else if (!username) {
      setErrors(['Username is required.'])
      return;
    } else if (!password) {
      setErrors(['Password is required.'])
      return;
    } else if (password.length < 6) {
      setErrors(['Password must be at least 6 characters.'])
      return;
    } else {
      Axios.post(import.meta.env.VITE_USERLOGIN, {
        username,
        password
      })
      .then((response) => {
        console.log(response);
        console.log('Login success');
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
    // Axios.post(import.meta.env.VITE_USERLOGIN, {
    //   username,
    //   password,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     console.log('Login success');
    //     const { token } = response.data; 
    //     localStorage.setItem('loggedInUser', JSON.stringify({ token, username }));
    //     navigateTo('/');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('Login failed');
    //     alert('The username or password is incorrect');
    //   });
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
              {errors || ''}
            </div>

            <div>
            <button  onClick={submitLogin}  className={`${lscss.submitbtn}`} type='submit'>Login</button>
            <Link to="/auth/signup"><button className={`${lscss.sidebtn}`}>Not Registered yet ?</button></Link>
            </div>
            <div>
              <Gauth />
            </div>
        </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login;