import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

  // Scroll Animation
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
    }, 2000);

    return () => clearTimeout(timer);
  });

  // Conditional rendering
  const UserToken = Cookies.get('auth');

  // Morebox readmore
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  }
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
      <div className={`${css.detailboxes}, ${css.flexbw}`} style={{ marginTop: showDivs1 ? '0px' : '150px' , transition: 'margin-top 0.2s'}}>
        <div className={css.getstarted}>
          <h2>Getting Started...</h2>
          <p>Welcome to Artvista, your colorful online hub for artists and art aficionados! Immerse yourself in a realm where creativity thrives without limits. Whether you're a seasoned artist or embarking on your creative voyage, Artvista is your platform to exhibit, connect, and ignite inspiration. Come join us today and uncover a cosmos of artistic wonders waiting to be explored!</p>
          {
            UserToken? (
              <>
              <p>Craft your digital presence with style: choose and customize your own profile picture and username!</p>
              <button onClick={() => navigate('/auth/editauth')}>Get Started</button>
              </>
            ) : (
              <>
              <p>Craft your digital presence with style: choose your own profile picture and username! Dive deeper by logging in to unlock exclusive features and connect with fellow art enthusiasts.</p>
              <button onClick={() => navigate('/auth/signup')}>Get Started</button>
              <button onClick={() => navigate('/auth/login')}>Is this a Veteran ?</button>
              </>
            )
          }
        </div>
        <div className={css.getstarted}>
          <h2>Check this out !</h2>
          {
            UserToken? (
              <>
              <p>Ready to share your latest masterpiece or spark a conversation about art? The ArtVista is your gateway to sharing your artistic journey with the world. Whether it's showcasing your latest artwork, sharing insights into your creative process, or discussing the latest trends in the art world, Our website is your universal tool to connect, inspire, and collaborate with fellow artists and enthusiasts on Artvista. Join the conversation and let your creativity shine!</p>
              <button onClick={() => navigate('/create')}>Check Out</button>
              </>
            ) : (
              <>
              <p>Discover a world of artistic inspiration and creativity by joining our community today! Log in to unlock the 'Create Post' feature and start sharing your artistic journey with others. If you're not logged in yet, click here to explore our vibrant community and discover amazing artworks and discussions. Don't miss out on the opportunity to connect, inspire, and collaborate with fellow artists and art enthusiasts on Artvista. Let's create something incredible together!</p>
              <button onClick={() => navigate('/explore')}>Discover Now !</button>
              </>
            )
          }
        </div>
      </div>
      <div className={css.flexbw}>
      <div className={css.morebox}>
      <h2>What sets our application apart</h2>
      <div className={css.morepara}>
        <p>Diverse Artistic Community: At Artvista, we celebrate diversity in artistic expression. Our community includes painters, sculptors, photographers, digital artists, and creators of all kinds, contributing to a rich tapestry of creativity.</p>
        {
          showMore ? (
            <>
            <p>Inspiration at Your Fingertips: Browse through a vast collection of artworks spanning various genres and styles. Whether you're looking for classical paintings, modern digital art, or experimental sculptures, Artvista is your gallery of inspiration.</p>
            <p>Engage and Collaborate: Connect with fellow artists and art enthusiasts through discussions, critiques, and collaborations. Share your insights, learn from others, and collaborate on projects that push the boundaries of creativity.</p>
            <p>Empowering Artists: We believe in empowering artists to showcase their work authentically. Customize your profile, share your portfolio, and gain recognition for your talents within our supportive community.</p>
            <p>Educational Resources: Access valuable resources, tutorials, and workshops to enhance your skills and knowledge. Learn new techniques, explore emerging trends, and grow as an artist with Artvista's educational offerings.</p>
            </>
          ) : null
        }
      <a onClick={toggleShowMore} className={css.readButton}>
        {showMore ? 'Read Less' : 'Read More'}
      </a>
      </div>
    </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
