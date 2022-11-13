import axios from 'axios';
import { API_URL } from '../constants/API';
import authHeader from './auth-header';

export const getPublicContent = () => {
  //функция для доступа всех пользователей
  return axios.get(API_URL);
};

export const getUserBoard = () => {
  return axios.get(API_URL + 'boards', { headers: authHeader() }); //для доступа зарегистрированных
};
