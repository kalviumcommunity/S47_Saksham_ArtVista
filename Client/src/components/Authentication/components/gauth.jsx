import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import gcss from './gauth.module.css';
import handleRedirectCallback from './handleCallback'; // Adjust the import path as needed

function gauth() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const navigateTo = useNavigate();

  const loginWithGoogle = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
    });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleRedirectCallback(user, getAccessTokenSilently, navigateTo);
    }
  }, [getAccessTokenSilently, isLoading, isAuthenticated, navigateTo, user]);

  return (
    <>
      {!isAuthenticated && (
        <button className={gcss.googlebutton} onClick={loginWithGoogle}>
          Continue with Google
        </button>
      )}
    </>
  );
}

export default gauth;
