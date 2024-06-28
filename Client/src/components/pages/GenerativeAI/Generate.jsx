import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import css from './Generate.module.css';

function Generate() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleGenerateContent = async () => {
    if (prompt.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: prompt }]);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/generate`, { prompt });
      const aiResponse = response.data.content;

      setMessages([...messages, { sender: 'user', text: prompt }, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Error generating content:', error);
    }

    setPrompt('');
  };

  return (
    <>
    <Navbar/>
    <br /><br /><br /><br /><br /><br />
    <div className={css.chatcontainer}>
      <div className={css.chatwindow}>
        {
          messages.length > 0 ?(
            <>
            {messages.map((message, index) => (
              <div key={index} className={`${css.chatmessage}`}>
                {message.text}
              </div>
            ))}
            </>
          ) : (
            <>
              <h2>Start Chat With ArtVista AI</h2>
              <p>ArtVista AI is an intelligent and innovative virtual assistant designed to inspire and assist you in your artistic journey. Powered by advanced generative AI technology, ArtVista AI can generate creative content, provide artistic suggestions, and engage in meaningful conversations to enhance your creative process.</p>
              <p>Simply input your prompt or question, and ArtVista AI will generate a thoughtful and creative response. Whether you're a writer, artist, designer, or simply someone seeking inspiration, ArtVista AI is here to fuel your creativity and help you achieve your artistic goals.</p>
            </>
          )
        }
      </div>
      <div className={css.textinput}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <button onClick={handleGenerateContent}>Send</button>
      </div>
    </div>
    </>
  );
}

export default Generate;
