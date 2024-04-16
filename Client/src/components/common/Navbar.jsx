import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navcss from './css/Navbar.module.css'
// auth0 import for saving cookie
import handleRedirectCallback from '../Authentication/components/handleCallback';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const UserToken = localStorage.getItem('UserToken');
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const navigateTo = useNavigate();
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleRedirectCallback(user, getAccessTokenSilently, navigateTo);
    }
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently, navigateTo]);


  return (
    <>
    <div className={navcss.navbar}>
        <img src="" alt="lol" />
        <div className={navcss.linksdiv}>
            <Link className={navcss.links} to="/"><p>Home</p></Link>
            <Link className={navcss.links} to="/search"><p>Search</p></Link>
            <Link className={navcss.links} to="/create"><p>Create</p></Link>
            {/* <Link className={navcss.links} to="/myprofile"><p>My Profile</p></Link> */}
        </div>
        <div>
            {/* <Link className={navcss.loginsignup} to="/auth/login">Login</Link> */}
            {UserToken ? (
            <Link className={navcss.Backbtn} to="/auth/editauth">Profile</Link>
            ) : (
            <Link className={navcss.Backbtn} to="/auth/login">Login</Link>
            )}
        </div>
    </div>
    </>
  )
}

export default Navbar;