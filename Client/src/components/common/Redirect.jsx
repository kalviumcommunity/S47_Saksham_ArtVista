// import React from 'react';
// import axios from 'axios';

// const Redirect = ({ loginUrl, editAuthUrl }) => {
//   const handleLogin = async () => {
//       const sidCookie = document.cookie.split(';').find(row => row.trim().startsWith('connect.sid='));
//       if (sidCookie) {
//         window.location.href = '/auth/login';
//       } else {
//         window.location.href = '/auth/editauth';
//       }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Redirect;



import React, { useState } from 'react';

const Redirect = ({ isLoggedIn }) => {
  const [authStatus, setAuthStatus] = useState(isLoggedIn);

  const handleLogin = async () => {
    // Assume you have a login API or function that sets isLoggedIn state upon successful login
    // For simplicity, we directly set authStatus to true here
    setAuthStatus(true);
  };

  const handleLogout = () => {
    // Assume you have a logout API or function that clears the isLoggedIn state upon logout
    // For simplicity, we directly set authStatus to false here
    setAuthStatus(false);
  };

  const handleProfileClick = () => {
    if (authStatus) {
      window.location.href = '/auth/editauth'; // Redirect to edit authentication page if logged in
    } else {
      window.location.href = '/auth/login'; // Redirect to login page if not logged in
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {authStatus ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {/* <button onClick={handleProfileClick}>Profile</button> */}
    </div>
  );
};

export default Redirect;
