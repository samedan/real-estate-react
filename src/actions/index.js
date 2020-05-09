import axios from 'axios';

export const extractApiErrors = (resError) => {
  let errors = [{ title: 'Error', detail: 'Generic error' }];
  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }
  return errors;
};

export const fetchRentals = () => async (dispatch) => {
  const res = await axios.get('/api/v1/rentals');
  dispatch({
    type: 'FETCH_RENTALS',
    rentals: res.data,
  });
};

export const fetchRentalById = (rentalId) => async (dispatch) => {
  dispatch({ type: 'IS_FETCHING_RENTAL' });
  const res = await axios.get(`/api/v1/rentals/${rentalId}`);
  dispatch({
    type: 'FETCH_RENTAL_BY_ID',
    rental: res.data,
  });
};

export const createRental = (newRental) => {
  return {
    type: 'CREATE_RENTAL',
    rental: newRental,
  };
};

// AUTH Actions /////////////////////////////////////

// REGISTER
export const registerUser = (registerData) => {
  return axios
    .post('/api/v1/users/register', registerData)
    .catch((error) => Promise.reject(extractApiErrors(error.response || {})));
};

// Login
export const loginUser = (loginData) => {
  return axios
    .post('/api/v1/users/login', loginData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(extractApiErrors(error.response || {})));
};

// AUThState
export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || '',
  };
};
