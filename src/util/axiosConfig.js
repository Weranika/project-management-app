import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    /*  'http://localhost:4000' */ 'https://rss-app-project-manager.onrender.com',
  /* withCredentials: true, */
});

export default axiosInstance;
