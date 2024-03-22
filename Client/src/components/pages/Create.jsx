import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Createcss from './css/Create.module.css';

function Create() {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(file, title, description);
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
                onChange={handleTitleChange}
              />
            </div>

            <div className={`${Createcss.imglink}`}>
              <p htmlFor="image">Image Link</p>
              <input
                type='url'
                name='file'
                placeholder='******'
                onChange={(e) => setFile(e.target.value)}
              />
            </div>

            <div className={`${Createcss.textareadesc}`}>
              <p htmlFor="description">Description: </p>
              <textarea
                placeholder='Describe about your post here'
                onChange={handleDescriptionChange}
                className={`${Createcss.textareadesc}`}
                wrap="soft" 
              />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>

        <div className={`${Createcss.imgdispdiv}`}>
          <img
            src={file}
            alt='Img could not be displayed'
            onChange={handleFileChange}
            className={`${Createcss.imgdisplay}`}
          />
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Create;
