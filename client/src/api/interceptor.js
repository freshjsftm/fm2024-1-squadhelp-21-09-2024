import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const instance = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

let accessToken = null;

instance.interceptors.request.use(
  (config) => {
    const refreshToken = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN);
    if (refreshToken && accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + accessToken,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.pairTokens
    ) {
      const { data:{data:{pairTokens:{access, refresh}}}} = response;
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refresh);
      accessToken = access;
    }
    return response;
  },
  (err) => {
    console.log('interceptor err config =====>>>>>', err.config);
    
    if (
      err.response.status === 401 &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/login');
      return;
    }

    const refreshToken = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN);
    if(refreshToken && err.response.status === 408){
      const { data:{data:{pairTokens:{access, refresh}}}} = instance.post('auth/refresh', {refreshToken});
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refresh);
      accessToken = access;
      err.config.headers = {
        ...err.config.headers,
        Authorization: 'Bearer ' + accessToken,
      };
      return axios.request(err.config); // ???????
    }

    return Promise.reject(err);
  }
);

export default instance;
