import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import lscss from './loginsignup.module.css'
import {useNavigate} from 'react-router-dom'
import Gauth from './components/gauth'


function LoginSignup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the server
    Axios.post(`${import.meta.env.VITE_BACKEND}/signup`, {
      username, email, password
    }) .then((response) => {
      console.log(response)
      navigate('/auth/login')
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
    <div className={`${lscss.fullpage}`}>
    <Link to="/"><button className={`${lscss.Backbtn}`}>Back</button></Link>
    <br /><br />
    <div className={`${lscss.container}`}>
      <div className={`${lscss.welcome}`}>
        <h1>Welcome to the ArtVista !</h1>
        <p>The One and only Enthusiastic platform to browse and share your talent</p>
        <p>Get Started by filling this form and create your account</p>
        <p>Already have an account? <Link to="/auth/login">Login</Link></p>
      </div>
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
              required
              onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div>
            <button className={`${lscss.submitbtn}`} type='submit'>Sign up</button>
            <Link to="/auth/login"><button className={`${lscss.sidebtn}`}>Already a user ?</button></Link>
            </div>
            <Gauth />
        </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default LoginSignup;