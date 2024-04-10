import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
// import Footer from '../common/Footer';
import Createcss from './css/Create.module.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const [validatedmail, setValidatedmail] = useState({});
  useEffect(() => {
    const UserToken = localStorage.getItem('UserToken');
    if (!UserToken) {
      window.location.href = '/auth/login';
    } else {
      Axios.post(`${import.meta.env.VITE_BACKEND}/verifyuser`, {
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserToken}` 
        }
      })
      .then(response => {
        console.log('Success:', response.data.user);
        setValidatedmail(response.data.user);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  },[]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post(import.meta.env.VITE_CREATEAPI, {
      email: validatedmail.email,
      image, 
      title, 
      description
    }) .then((response) => {
      console.log(response);
      console.log('Post created successfully!');
      navigate('/');
    }) .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.message);
      console.log('Post creation failed!');
    });
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
            <p className={`${Createcss.terms}`}>{error || "By clicking on Submit, you agree to our terms and conditions" }</p>
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
