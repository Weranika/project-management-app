import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rss-app-project-manager.onrender.com',
  /* withCredentials: true, */
});

export default axiosInstance;
