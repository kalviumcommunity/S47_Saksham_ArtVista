import React, {useEffect, useState} from 'react'
import Createcss from './css/Create.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

// import loader
import Loader from '../common/components/loader';

function Modify() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [validatedmail, setValidatedmail] = useState({});

  const { postId } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/modify/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }); 
        setPost(response.data);
        // console.log(response.data);
        setDescription(response.data.description || '');
        setTitle(response.data.title || '');
        setImage(response.data.image || '');
        setLoading(false);
      } catch (error) {
        setError('Error fetching post details');
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [postId])

  const handleSubmit = async (e) => {
    const cooemail = localStorage.getItem('UserEmail');
    e.preventDefault();
    try {
      const UserToken = localStorage.getItem('UserToken');
      if (!UserToken) {
        console.error('Token not found');
        return;
      }
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/modify/${postId}`,
        {
          email: cooemail,
          title,
          description,
          image,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );
      console.log('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <>
    <button onClick={() => window.history.back()}>{"back <"}</button>
    {
      loading ? (
        <Loader/>
      ) : (
    <div className={`${Createcss.container}`}>
        <div className={`${Createcss.formconts}`}>
          <form onSubmit={handleSubmit}>
            <div className={`${Createcss.textareatitle}`}>
              <p htmlFor="title">Title: </p>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={`${Createcss.imglink}`}>
              <p htmlFor="image">Image Link</p>
              <input
                type='url'
                name='image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className={`${Createcss.textareadesc}`}>
              <p htmlFor="description">Description: </p>
              <textarea
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${Createcss.textareadesc}`}
                wrap="soft" 
              />
            </div>
            <button type='submit'>Submit</button>
            <p className={`${Createcss.terms}`}>{"By clicking on Submit, you agree to our terms and conditions" }</p>
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
      )
    }
    </>
  )
}

export default Modify;