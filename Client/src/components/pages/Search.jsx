import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Searchcss from './css/Search.module.css';
import axios from 'axios';

function Search() {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

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

// Filtering posts based on search criteria
  const filteredPosts = posts.filter(post => {
    const title = post.title && typeof post.title === 'string' ? post.title.toLowerCase() : '';
    const author = post.author && typeof post.author === 'string' ? post.author.toLowerCase() : '';

    return title.includes(searchTitle.toLowerCase()) && author.includes(searchAuthor.toLowerCase());
  });


  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      <div className={`${Searchcss.fullflex}`}>
        <div className={`${Searchcss.container}`}>
          
          <div className={`${Searchcss.searchflex}`}>
            <div className={`${Searchcss.searchflextt}`}>
              <p>Search By Title</p>
              <input 
                type="text"
                className={`${Searchcss.searchinput}`}
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
              />
            </div>
            <div className={`${Searchcss.searchflextt}`}>
              <p>Search By Author</p>
              <input 
                type="text"
                className={`${Searchcss.searchinput}`}
                value={searchAuthor}
                onChange={e => setSearchAuthor(e.target.value)}
              />
            </div>
          </div>
          
          <button className={`${Searchcss.searchbtn}`}>Start Searching</button>
        </div>        
      </div>

      <br /><br /><br />

      <div className={`${Searchcss.fullflex}`}>
        {filteredPosts.map((post) => (
          <div className={`${Searchcss.posts}`} key={post._id}>
            <h2>{post.title}</h2>
            <p>Author: {post.author}</p>
            <img src={post.image} alt="" />
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Search;
