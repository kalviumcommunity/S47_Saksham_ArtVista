import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
// import Footer from '../common/Footer';
import Createcss from './css/Create.module.css';
import Axios from 'axios';

function Create() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  // console.log(loggedInUser.username);

  // useEffect(() => {
  //   const formData = JSON.parse(sessionStorage.getItem('formData'));
  //   if (formData) {
  //     setImage(formData.image || '');
  //     setTitle(formData.title || '');
  //     setDescription(formData.description || '');
  //   }
  // }, []);

  // useEffect(() => {
  //   const formData = { image, title, description };
  //   sessionStorage.setItem('formData', JSON.stringify(formData));
  // }, [image, title, description]);

  // useEffect(() => {
  //   return () => {
  //     sessionStorage.removeItem('formData');
  //   };
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post(import.meta.env.VITE_CREATEAPI, {
      username: loggedInUser.username,
      image, 
      title, 
      description
    }) .then((response) => {
      console.log(response);
      console.log('Post created successfully!');
      alert('Post created successfully!');
    }) .catch((error) => {
      console.log(error);
      console.log('Post creation failed!');
      alert('Post creation failed!');
    })
    // console.log(image, title, description);
  }

  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      <div className={`${Createcss.container}`}>
        <div className={`${Createcss.formconts}`}>
          <form onSubmit={handleSubmit}>
            <div className={`${Createcss.textareatitle}`}>
              <p htmlFor="title">Title: </p>
              <input
                type='text'
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={`${Createcss.imglink}`}>
              <p htmlFor="image">Image Link</p>
              <input
                type='url'
                name='image'
                placeholder='******'
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className={`${Createcss.textareadesc}`}>
              <p htmlFor="description">Description: </p>
              <textarea
                placeholder='Describe about your post here'
                onChange={(e) => setDescription(e.target.value)}
                className={`${Createcss.textareadesc}`}
                wrap="soft" 
              />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>

        <div className={`${Createcss.imgdispdiv}`}>
          <img
            src={image}
            alt='Img could not be displayed'
            className={`${Createcss.imgdisplay}`}
          />
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Create;
