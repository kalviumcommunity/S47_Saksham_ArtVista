import React, { useState } from 'react';
import Navbar from '../common/Navbar';
// import Footer from '../common/Footer';
import Createcss from './css/Create.module.css';
import Axios from 'axios';

function Create() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3000/api/posts', {
      image, title, description
    }) .then((response) => {
      console.log(response);
    }) .catch((error) => {
      console.log(error);
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
