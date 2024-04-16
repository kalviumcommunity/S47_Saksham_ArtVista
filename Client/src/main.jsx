import React from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';


const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain={import.meta.env.VITE_AUTHO_DOMAIN}
{/*     clientId={import.meta.env.VITE_CLIENT_ID}
    authorizationParams={{
      redirect_uri: "https://s47-saksham-capstone-art-vista-v7wm.vercel.app/auth/login",
    }} */}
  >
    <App />
  </Auth0Provider>,
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
