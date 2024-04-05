import React, { useState , useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import gcss from './gauth.module.css'
import Axios from 'axios';


function gauth() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, isLoading  } = useAuth0();
  const navigateTo = useNavigate();
  function loginWithGoogle() {
    loginWithRedirect({
      connection: 'google-oauth2',
    });
  }

  useEffect(() => {
    if (isAuthenticated && isLoading) {
      handleRedirectCallback();
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently, navigateTo, user]);

  useEffect(() => {
    const handleRedirectCallback = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log("user logged in successfully !", user.email);
        localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, token: accessToken }));
        // navigateTo('/');

        try {
          const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/checkgoogleuser`, { email: user.email });
          console.log(response);
          if (response.status === 200) {
            console.log('details matched');
            localStorage.setItem('Username', JSON.stringify({username: response.data.message }));
            navigateTo('/');
          } else if(response.status === 214 || response.status === 215) {
            navigateTo('/auth/config/setuser');
            console.log('Redirection should happen');
          }
      } catch (error) {
          console.error('some unexpected error', error);
      }
      
      } catch (error) {
        // console.error('Error during redirect callback:', error.message);
      }
    };

    if (!isLoading) {
      handleRedirectCallback();
    }
  }, [getAccessTokenSilently, isLoading]);
  return (
    <>
    <button className={gcss.googlebutton} onClick={() => loginWithGoogle()} >Continue with Google</button>
    </>
  )
}

export default gauth