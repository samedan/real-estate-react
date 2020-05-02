import axios from 'axios';

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
