import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
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
    <Link to="/auth">Back</Link>
    <div className='signup'>
        <h2>SignUp</h2>
        <form className='signup-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type='text' placeholder='username' 
            onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="email">Email:</label>
            <input type='email' placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)}/>
            
            <label htmlFor="password">Password:</label>
            <input type='text' placeholder='******' 
            onChange={(e) => setPassword(e.target.value)}/>

            <button type='submit'>Sign up</button>
        </form>
    </div>
    </>
  )
}

export default LoginSignup;