import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import homecss from './css/Home.module.css';

//loader import
import Loader from '../common/components/loader';

// auth0 import for saving cookie
import handleRedirectCallback from '../Authentication/components/handleCallback';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const [posts, setPosts] = useState([]);
  const [existingUsernames, setExistingUsernames] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleRedirectCallback(user, getAccessTokenSilently, navigate);
    }
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/posts/home`);
        setPosts(response.data);
        setIsLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoader(false);
      }
    };

    fetchData();
  }, []);
  const fetchUsernames = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getpostuser`);
      setExistingUsernames(response.data.users); 
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };
  fetchUsernames();

  const handleUserVisit = (email) => {
    localStorage.setItem('visit_user', email);
    navigate(`/other/${email}`);
  };

  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      {isLoader ? (
        <Loader /> 
      ) : (
        <div className={homecss.container}>
          <div className={homecss.postscont}>
            {posts.map(post => (
              <div className={homecss.postinv} key={post._id}>
                <div className={homecss.postimagecont}>
                  <img src={post.image} alt="post" className={homecss.postimage} />
                </div>
                <div className={homecss.postdetails}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <button onClick={() => handleUserVisit(existingUsernames.find(user => user.email === post.email)?.username || "username")}>
                    <h4>by: {existingUsernames.find(user => user.email === post.email)?.username || post.email}</h4>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Home;
