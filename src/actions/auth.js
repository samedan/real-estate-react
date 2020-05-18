import axiosService from '../services/AxiosService';
import { extractApiErrors } from '.';

const { bwmAxios } = axiosService;

// AUTH Actions /////////////////////////////////////

// REGISTER
export const registerUser = (registerData) => {
  return bwmAxios
    .post('/users/register', registerData)
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};

// Login
export const loginUser = (loginData) => {
  return bwmAxios
    .post('/users/login', loginData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};

// AUThState
export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || '',
  };
};
