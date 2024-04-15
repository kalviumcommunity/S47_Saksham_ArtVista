import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import lcss from './css/EditAuth.module.css'

// posts import
import UserPosts from '../pages/UserPosts'
// profile pic import
import ImageUpload from './components/ImageUpload'
// username manual set
import SetUser from './components/SetUser'
// import loader
import Loader from '../common/components/loader'

function Editauth() {

  const navigateTo = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  function handleGGLogout() {
    localStorage.removeItem('Username');
    localStorage.removeItem('loggedInUser'); 
    localStorage.removeItem('UserToken');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('accessToken');
    logout({ post_logout_redirect_uri: window.location.origin });
  }

  const accessToken = localStorage.getItem('accessToken');

  const handleUsernameRedirect = () => {
    navigateTo('/auth/config/setuser')
  }

  const handleLogout = () => {
    Axios.post(import.meta.env.VITE_USERLOGOUT, {
    }).then((response) => {
      localStorage.removeItem('UserToken');
      localStorage.removeItem('UserEmail');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('Username');
      console.log(response);
      navigateTo('/auth/login');
    }).catch((error) => {
      console.log(error);
      console.log('Logout failed');
      alert('Error while logout');
    })
  }
  const [validated, setValidated] = useState({});
  useEffect(() => {
    const UserToken = localStorage.getItem('UserToken');
    if (!UserToken) {
      window.location.href = '/auth/login';
    } else {
      console.log(`${import.meta.env.VITE_BACKEND}/verifyuser`);
      Axios.post(`${import.meta.env.VITE_BACKEND}/verifyuser`, {
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserToken}` 
        }
      })
      .then(response => {
        setValidated(response.data.user);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : (
        <>
        <div className={lcss.navbarr}>
          <div>
            <button className={lcss.Backbtn} onClick={() => navigateTo('/')}>{"< Back"}</button>
          </div>
          <div className={lcss.navbarr}> 
            <button className={lcss.Backbtn} onClick={handleUsernameRedirect}>Change Your Username</button>
            <div>
                {
                  isAuthenticated ? (
                    <button className={lcss.Backbtn} onClick={handleGGLogout}>
                      Logout 
                    </button>
                  ) : (
                    <button className={lcss.Backbtn} onClick={handleLogout}>Logout</button>
                  )
                }
            </div>
          </div>
        </div>
          <div className={lcss.procont}>
          {
            accessToken ? (
              <img className={lcss.profilepic} src={user.picture} alt={validated.name} /> 
            ) : (
              <ImageUpload/>
            )
          }
          <div className={lcss.profile}>
            <pu>Hello {validated.username} !</pu>
            <pe>{validated.email}</pe>
          </div>
          </div>
        <div>
          
        </div>
        </>
      )
      }
      
      <UserPosts />
    </>
  )
}

export default Editauth