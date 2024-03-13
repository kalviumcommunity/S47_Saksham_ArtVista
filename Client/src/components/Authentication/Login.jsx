import React from 'react'
import { Link } from 'react-router-dom';
import lscss from './LoginSignup.module.css'

function Login() {
  return (
    <>
    <Link to="/"><button className={`${lscss.Backbtn}`}>Back</button></Link>
    <div className={`${lscss.container}`}>
    <div className={`${lscss.signup}`}>
        <h2>Login</h2>
        <form className={`${lscss.form}`} action="">
            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="username">Username:</label>
              <input
              className={`${lscss.inputbox}`}  
              type='text' 
              placeholder='test@test.com'
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className={`${lscss.formdiv}`}>
              <label className={`${lscss.labeltxt}`} htmlFor="password">Password:</label>
              <input
              className={`${lscss.inputbox}`}  
              type='text' 
              placeholder='******'
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
            <button className={`${lscss.submitbtn}`} type='submit'>Login</button>
            <Link to="/auth/signup"><button className={`${lscss.sidebtn}`}>Not Registered yet ?</button></Link>
            </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default Login;