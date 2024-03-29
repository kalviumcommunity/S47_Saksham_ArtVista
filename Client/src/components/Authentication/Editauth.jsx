import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


function Editauth() {

  const navigateTo = useNavigate();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

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
    // <>Hello User!
    // <div>
    // isAuthenticated && (
    //   <div>
    //     <img src={user.picture} alt={user.name} />
    //     <h2>{user.name}</h2>
    //     <p>{user.email}</p>
    //   </div>
    // )
    // </div>
    // <div>
    //   <button onClick={handleLogout}>Logout</button>
      
    //   <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    //   Log Out Google
    //   </button>
    
    // </div>
    // </>
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <>
          Hello {user.name}!
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out Google
            </button>
          </div>
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </>
  )
}

export default Editauth