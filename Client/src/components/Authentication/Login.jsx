import React from 'react'
import { Link } from 'react-router-dom';




function Login() {
  return (
    <>
    <Link to="/auth">Back</Link>
    <div className='signup'>
        <h2>SignUp</h2>
        <form className='signup-form' action="">
            <label htmlFor="username">Username:</label>
            <input type='text' placeholder='test@test.com'/>
            
            <label htmlFor="password">Password:</label>
            <input type='text' placeholder='******'/>

            <button type='submit'>Login</button>
        </form>
    </div>
    </>
  )
}

export default Login;