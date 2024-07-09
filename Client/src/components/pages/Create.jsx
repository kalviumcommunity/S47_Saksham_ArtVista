import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../common/Navbar';
import Createcss from './css/Create.module.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [image, setImage] = useState('');
  const [imgfile, setImgfile] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [validatedmail, setValidatedmail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const UserToken = Cookies.get('auth');
    if (!UserToken) {
      navigate('/auth/login');
    } else {
      Axios.post(`${import.meta.env.VITE_BACKEND}/verifyuser`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserToken}` 
        }
      })
      .then(response => {
        setValidatedmail(response.data.user);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [navigate]);

  useEffect(() => {
    if (imgfile) {
      const objectUrl = URL.createObjectURL(imgfile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imgfile]);

  const handleGenerateDescription = async () => {
    console.log(title, description);
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_BACKEND}/lang`,
        { 
          title: title,
          description: description
        }
      );
      setDescription(response.data.content);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate description');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      if (!image && !imgfile) {
        setError('Please upload an image.');
        return; 
      }
  
      let imageUrl = image;
  
      if (imgfile) {
        const data = new FormData();
        data.append('file', imgfile);
        data.append('upload_preset', 'artvista');
        data.append('cloud_name', 'dz4ycvkkw');
        
        const cloudinaryResponse = await Axios.post('https://api.cloudinary.com/v1_1/dz4ycvkkw/image/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
  
        imageUrl = cloudinaryResponse.data.url;
        setImage(imageUrl);
      }
  
      const backendResponse = await Axios.post(`${import.meta.env.VITE_BACKEND}/posts`, {
        email: validatedmail.email,
        title: title,
        description: description,
        image: imageUrl
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log(backendResponse);
      console.log('Post created successfully!');
      navigate('/');
      sessionStorage.clear();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data.message);
        console.log('Post creation failed!');
      } else {
        console.log('Error:', error);
      }
    }
  }

  const handleRemoveFile = () => {
    setPreview('');
    setImage('');
    setImgfile(null);
  };

  useEffect(() => {
    const storedTitle = sessionStorage.getItem('title');
    const storedDescription = sessionStorage.getItem('description');
    const storedImage = sessionStorage.getItem('image');
    if (storedTitle) {
      setTitle(storedTitle);
    }
    if (storedDescription) {
      setDescription(storedDescription);
    }
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('title', title || '');
    sessionStorage.setItem('description', description || '');
    sessionStorage.setItem('image', image || '');
  }, [title, description, image]);

  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      <div className={`${Createcss.container}`}>
        <div className={`${Createcss.formconts}`}>
          <form>
            <div className={`${Createcss.textareatitle}`}>
              <p htmlFor="title">Title: </p>
              <input
                type='text'
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className={`${Createcss.imglink}`}>
              <p htmlFor="image">Image Link</p>
              <input
                type='url'
                name='image'
                placeholder='******'
                onChange={(e) => setImage(e.target.value)}
                value={image}
                disabled={!!imgfile}
              />
              <input
                type='file'
                name='imgfile'
                accept='image/*'
                placeholder='******'
                onChange={(e) => {
                  console.log('Selected file:', e.target.files[0]);
                  setImgfile(e.target.files[0]);
                }}
                disabled={!!image}
              />
              {
                imgfile || preview || image ? (
                  <button type='button' onClick={handleRemoveFile}>Remove</button>
                ) : (
                  <></>
                )
              }
            </div>

            <div className={`${Createcss.textareadesc}`}>
              <p htmlFor="description">Description: </p>
              <textarea
                placeholder='Describe about your post here'
                onChange={(e) => setDescription(e.target.value)}
                className={`${Createcss.textareadesc}`}
                wrap="soft" 
                value={description}
              />
            </div>
            <button type='submit' onClick={handleSubmit}>Submit</button>
            {
              title && description ? (
                <button type='button' onClick={handleGenerateDescription} >Improve</button>
              ) : (
                <></>
              )
            }
            <p className={`${Createcss.terms}`}>{error || "By clicking on Submit, you agree to our terms and conditions"}</p>
          </form>
        </div>

        <div className={`${Createcss.imgconts}`}>
          <div className={`${Createcss.imgdispdiv}`}>
          {
            imgfile ? (
              <img
                src={preview}
                alt='Img could not be displayed'
                className={`${Createcss.imgdisplay}`}
              />
            ) : (
              image ? (
                <img
                  src={image}
                  alt='Img could not be displayed'
                  className={`${Createcss.imgdisplay}`}
                />
              ) : (
                <p>no image selected</p>
              )
            )
          }
            <div className={`${Createcss.imgtext}`}>
              <h2>{title}</h2>
            </div>
            <div className={`${Createcss.imgtext}`}>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Create;
