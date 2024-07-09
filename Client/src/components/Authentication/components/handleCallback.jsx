import Axios from 'axios';
import Cookies from 'js-cookie';

async function handleRedirectCallback(user, getAccessTokenSilently, navigateTo) {
  try {
    const accessToken = await getAccessTokenSilently();
    console.log("User logged in successfully!", user.email);


    const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/checkuser`, { email: user.email });
    console.log(response);
    if (response.status === 200) {
      console.log('Details matched');
      Cookies.set('auth', response.data.token);
      navigateTo('/');
    } else if (response.status === 214 || response.status === 215) {
      Cookies.set('auth', response.data.token);
      console.log('Redirection should happen');
      navigateTo('/auth/config/setuser');
    }
  } catch (error) {
    console.error('Error during redirect callback:', error.message);
  }
}

export default handleRedirectCallback;
