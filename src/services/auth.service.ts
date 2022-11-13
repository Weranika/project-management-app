import axios from 'axios';
import { API_URL } from '../constants/API';

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + 'auth/signup', { username, email, password });
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL + 'auth/signin', {
    username,
    password,
  });
  if (response.data.accesToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeIte, 'user';
};

// export const getCurrentUser = () => {
//   const userStr = localStorage.getItem("user");
//   if (userStr) return JSON.parse(userStr);

//   return null;
// };
