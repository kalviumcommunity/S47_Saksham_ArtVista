import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import css from './css/Search.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [existingUsernames, setExistingUsernames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/posts/home`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getpostuser`);
        setExistingUsernames(response.data.users); 
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    fetchUsernames();
  }, [])

  const filteredPosts = posts.filter(post => {
    const title = post.title && typeof post.title === 'string' ? post.title.toLowerCase() : '';
    return title.includes(searchTitle.toLowerCase());
  });

  const filteredusers = existingUsernames.filter(user => {
    return user.username.toLowerCase().includes(searchTitle.toLowerCase());
  });
  

  const handleUserVisit = (username) => {
    navigate(`/other/${username}`);
  }

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

  const shuffledfilteredposts = shuffle([...filteredPosts]);
  return (
    <>
    <Navbar />
    <br /><br /><br /><br /><br />
      <div className={css.container}>
        <div className={css.searchbar}>
          <input
            type='text'
            placeholder='Search...'
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        {
          searchTitle? (
            <div className={css.flexcont}>
            <section className={css.usernames}>
              <h3>Users Found</h3>
              {
                  filteredusers.map((user) => (
                    <div className={css.username} key={user.username}>
                    <p onClick={() => handleUserVisit(user.username)}>{user.username}</p>
                    </div>
                  ))
              }
              <p style={{marginTop: '50px', color: 'gray'}}>Thats what we found</p>
            </section>
            <section className={css.filteredposts}>
              {
                shuffledfilteredposts.map((post) => (
                  <div onClick={() => handlePostVisit(post._id)} className={css.post} key={post._id}>
                    <img src={post.image} alt="" />
                    <div className={css.postinfo}>
                      <p>{post.title}</p>
                    </div>
                  </div>
                ))
              }
            </section>
            </div>
          ) : (
            <>
            <p className={css.inputshow}>Please input in search box</p>
            </>
          )
        }
      </div>
      <Footer />
    </>
  );
}

export default Search;
