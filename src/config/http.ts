import axios from 'axios';
import Config from 'react-native-config';

const http = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error),
);

export default http;
