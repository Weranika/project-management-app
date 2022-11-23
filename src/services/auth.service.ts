import axios from 'axios';
import { Result } from '../components/Forms/SignInForm';
import { API_URL } from '../constants/API';

interface UserRegisterType {
  login: string;
  password: string;
  name: string;
}

export const register = ({ name, login, password }: UserRegisterType) => {
  return axios.post(API_URL + '/auth/signup', { name, login, password });
};

interface UserLoginType {
  login: string;
  password: string;
}

export const login = async ({
  login,
  password,
}: UserLoginType): Promise<Result> => {
  const result = {
    data: {},
    error: '',
  };
  try {
    const response = await axios.post(API_URL + '/auth/signin', {
      login,
      password,
    });
    /*  if (response.data.accesToken) { */
    localStorage.setItem('jwt', response.data.token);
    /*  } */
    result.data = response.data;
  } catch (error: any) {
    if (error.response.status === '401') {
      result.error = 'Authorization error'; //взять из messages
    } else {
      result.error = 'Server mistake'; //сделать проверки на статусы и выдавать ошибку в зависимости от статуса
    }
    //изменить тип
    result.error = 'everything is shit';
    console.log(error.response);
  }
  return result;
};

export const logout = () => {
  localStorage.removeItem, 'user';
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
