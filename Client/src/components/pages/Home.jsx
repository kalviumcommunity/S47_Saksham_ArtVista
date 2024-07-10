import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// components import
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import css from './css/Landing.module.css';

function Home() {
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();

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
      <div className={css.fullpage}>
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
            <h2>What sets our application apart.</h2>
            <div className={css.morepara}>
              <video autoPlay loop muted
              width='100%'
                src='./videos/explore.mp4'
              />
              <p>ArtVista empowers creators with a dynamic platform to explore and showcase their talents. Users can effortlessly browse a diverse collection of images, discovering new inspirations and creators. ArtVista's intuitive interface allows creators to upload and share their artwork, ensuring their creations reach a wide audience. With robust features like AI improvements, artists can easily manage their portfolios, customize their profiles, and engage with the community. ArtVista transforms the digital art experience, making it seamless and enjoyable for artists to exhibit their work and for admirers to explore endless possibilities.</p>
            </div>
            <div className={css.morepara}>
              <p>ArtVista offers a powerful search functionality that enhances the user experience by allowing seamless discovery of both users and posts. Creators and art enthusiasts can easily find specific artworks, search artists, and explore curated content. The advanced search filters enable users to refine their searches by keywords, ensuring precise and relevant results. Whether searching for inspiration, or specific art styles, ArtVista's search feature streamlines the process, making it efficient and intuitive.This robust search capability fosters a vibrant community by connecting users to the art and artists that inspire them.</p>
              <video autoPlay loop muted
              width='100%'
                src='./videos/search.mp4'
              />
            </div>
            <div className={css.morepara}>
              <video autoPlay loop muted
              width='100%'
                src='./videos/improve.mp4'
              />
              <p>ArtVista's enhanced functionality for improving post descriptions revolutionizes how creators present their artwork. As users create posts, this feature leverages advanced AI to suggest and refine descriptions, ensuring each piece is accurately and compellingly represented. By automatically generating vivid, descriptive text, it helps artists articulate their creative vision and engage their audience more effectively. This functionality not only saves time but also enhances the storytelling aspect of each post, making the artwork more appealing and accessible. ArtVista's description improvement tool ensures that every post is optimized for impact, helping creators showcase their work with professional-level descriptions.</p>
            </div>
            <p className={css.moreparap}>
            "Discover, Create, Inspire — Unleashing Creativity One Pixel at a Time."
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
