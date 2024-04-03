import React, { useState , useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import gcss from './gauth.module.css'


function gauth() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, isLoading  } = useAuth0();
  const navigateTo = useNavigate();
  function loginWithGoogle() {
    loginWithRedirect({
      screen_hint: 'login',
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
        await getAccessTokenSilently();
        console.log("user logged in successfully !", user.email);
        localStorage.setItem('loggedInUser', JSON.stringify({ username: user.email, token: getAccessTokenSilently() }));
        navigateTo('/');
      } catch (error) {
        console.error('Error during redirect callback:', error.message);
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