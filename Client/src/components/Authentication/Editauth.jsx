import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Editauth() {

  const navigateTo = useNavigate();

  const handleLogout = () => {
    Axios.post(import.meta.env.VITE_USERLOGOUT, {

    }).then((response) => {
      console.log(response);
      navigateTo('/auth/login');
      localStorage.removeItem('loggedInUser');
    }).catch((error) => {
      console.log(error);
      console.log('Logout failed');
      alert('Error while logout');
    })
  }
  return (
    <>Hello User!
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  )
}

export default Editauth