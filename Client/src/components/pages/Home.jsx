import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// components import
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import css from './css/Landing.module.css';

// auth0 import for saving cookie
import handleRedirectCallback from '../Authentication/components/handleCallback';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();

  //--------------- gauth management ---------//
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleRedirectCallback(user, getAccessTokenSilently, navigate);
    }
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently, navigate]);

  // ---------- styling code below -----------//

  // Scroll 1
  const [showDivs1, setShowDivs1] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 80) { 
      setShowDivs1(true);
    } else {
      setShowDivs1(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto Scroll

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollY = window.scrollY;
      if (scrollY <= 150) {
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
    }, 1200);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br /><br />
      <h1 className={css.welcome} style={{ fontSize: showDivs1 ? "0vw" : "2vw" , transition: 'font-size 0.2s'}}>SG welcomes you to the...</h1>
      <div className={css.logo}>
        <div className={css.content}>
          <div>
            <div className={css.flexbw}>
              <h1 className={css.art} style={{ fontSize: showDivs1 ? "8vw" : "13vw" , transition: 'font-size 0.2s'}}>ART</h1>
              <h1 className={css.artvista}  style={{ fontSize: showDivs1 ? "8vw" : "13vw" , transition: 'font-size 0.2s'}}>VISTA</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`${css.detailboxes}, ${css.flexbw}`} style={{ opacity: showDivs1 ? 1 : 0 , transition: 'opacity 0.2s'}}>
        <div className={css.getstarted}>
          <h2>Getting Started...</h2>
          <p>Welcome to Artvista, your vibrant online community for artists and art enthusiasts! Dive into a world where creativity knows no bounds. Whether you're an established artist or just starting your artistic journey, Artvista is your canvas to showcase, connect, and inspire. Join us today and explore a universe of artistry waiting to be discovered!</p>
        </div>
        <div className={css.getstarted}>
          <h2>Want to display...</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat neque, sunt, aut sed placeat necessitatibus, molestiae velit odit voluptatibus dolores ratione. Magni deserunt perspiciatis vitae?
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
