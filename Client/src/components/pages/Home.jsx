import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import homecss from './css/Home.module.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [existingUsernames, setExistingUsernames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_HOMEAPI);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
                <button onClick={() => handleUserVisit(existingUsernames.find(user => user.email === post.email)?.username || post.email)}>
                  <h4>by: {existingUsernames.find(user => user.email === post.email)?.username || post.email}</h4>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
