import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
