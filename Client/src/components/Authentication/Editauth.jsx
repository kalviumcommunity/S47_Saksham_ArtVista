import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import lcss from './css/EditAuth.module.css'
import { googleLogout } from '@react-oauth/google'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'   

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
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = Cookies.get('av-authtype');

  function handleGGLogout() {
    Cookies.remove('auth');
    Cookies.remove('av-authtype');
    googleLogout();
    navigateTo('/auth/login');
  }

  const handleUsernameRedirect = () => {
    navigateTo('/auth/config/setuser')
  }

  const handleImageRedirect = () => {
    navigateTo('/auth/config/setimage')
  }

  const handleLogout = () => {
    Axios.post(`${import.meta.env.VITE_USERLOGOUT}`, {
    }).then((response) => {
      Cookies.remove('auth');
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
    const UserToken = Cookies.get('auth');
    if (!UserToken) {
      navigateTo('/auth/login');
    } else {
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
      <Navbar/>
      <br /><br /><br /><br /><br /><br />
      {isLoading ? (
        <Loader/>
      ) : (
        <>
        <div className={lcss.procont}>
          <ImageUpload/>
          <div className={lcss.profile}>
            <pu>Hello {validated.username} !</pu>
            <pe>{validated.email}</pe>
          </div>
        </div>
        <div className={lcss.navbarr}>
            {/* <button className={lcss.Backbtn} onClick={() => navigateTo("/explore")}>{"< Back"}</button> */}
            <div className={lcss.navbarr}> 
            {/* <button className={lcss.Backbtn} onClick={() => navigateTo("/ai/generate")}>Chat with ArtVista</button> */}
            <button className={lcss.Backbtn} onClick={handleImageRedirect}>Change Profile Picture</button>
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
        </>
      )
      }
      
      <UserPosts />
      <Footer/>
    </>
  )
}

export default Editauth