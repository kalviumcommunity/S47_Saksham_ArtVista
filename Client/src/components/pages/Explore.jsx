import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import explorecss from './css/Explore.module.css';

//loader import
import Loader from '../common/components/loader';


function Explore() {
  const [posts, setPosts] = useState([]);
  const [existingUsernames, setExistingUsernames] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();

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
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getpostuser`);
        setExistingUsernames(response.data.users); 
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    fetchUsernames();
  }, []);

  const handleUserVisit = (email) => {
    navigate(`/other/${email}`);
  };
  const handlePostVisit = (postId) => {
    navigate(`/display/${postId}`);
  }

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const shuffledposts = shuffle([...posts]);
  
  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br /><br />
      {isLoader ? (
        <div data-testid='loader'>
          <Loader /> 
        </div>
      ) : (
        <div className={explorecss.container}>
          <div className={explorecss.postscont}>
            {shuffledposts.map(post => (
              <div className={explorecss.postinv} key={post._id} style={{cursor: 'pointer'}}>
                <img onClick={() => handlePostVisit(post._id)} src={post.image} alt="post" className={explorecss.postimage} />
                {/* <div className={explorecss.postdetails}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <button onClick={() => handleUserVisit(existingUsernames.find(user => user.email === post.email)?.username || post.email)}>
                    <h4>by: {existingUsernames.find(user => user.email === post.email)?.username || "username"}</h4>
                  </button>
                  <button>
                    <h4 onClick={() => handlePostVisit(post._id)}>View Post</h4>
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Explore;