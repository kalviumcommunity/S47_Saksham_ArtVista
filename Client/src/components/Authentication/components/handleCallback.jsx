import Axios from 'axios';

async function handleRedirectCallback(user, getAccessTokenSilently, navigateTo) {
  try {
    const accessToken = await getAccessTokenSilently();
    console.log("User logged in successfully!", user.email);
    localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, token: accessToken }));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('UserEmail', user.email);

    const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/checkuser`, { email: user.email });
    console.log(response);
    if (response.status === 200) {
      console.log('Details matched');
      localStorage.setItem('Username', response.data.message);
      localStorage.setItem('UserToken', response.data.token);
      navigateTo('/');
    } else if (response.status === 214 || response.status === 215) {
      navigateTo('/auth/config/setuser');
      console.log('Redirection should happen');
    }
  } catch (error) {
    console.error('Error during redirect callback:', error.message);
  }
}

export default handleRedirectCallback;
