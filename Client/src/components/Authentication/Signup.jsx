import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import lscss from './LoginSignup.module.css'


function LoginSignup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the server
    Axios.post('http://localhost:3000/auth/signup', {
      username, email, password
    }) .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }


  return (
    <>
    <Link to="/"><button className={`${lscss.Backbtn}`}>Back</button></Link>
    <div className={`${lscss.container}`}>
    <div className={`${lscss.signup}`}>
        <h2>SignUp</h2>
        <form className={`${lscss.form}`} onSubmit={handleSubmit}>
            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="username">Username:</label>
              <input
              className={`${lscss.inputbox}`} 
              type='text' 
              placeholder='username' 
              onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="email">Email:</label>
              <input
              className={`${lscss.inputbox}`} 
              type='email' 
              placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="password">Password:</label>
              <input
              className={`${lscss.inputbox}`} 
              type='text' 
              placeholder='******' 
              onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div>
            <button className={`${lscss.submitbtn}`} type='submit'>Sign up</button>
            <Link to="/auth/login"><button className={`${lscss.sidebtn}`}>Already a user ?</button></Link>
            </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default LoginSignup;