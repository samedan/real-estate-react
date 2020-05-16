import axiosService from '../services/AxiosService';
const { bwmAxios } = axiosService;

export const fetchRentals = (location) => async (dispatch) => {
  const query = location ? `/rentals?city=${location}` : '/rentals';
  dispatch({ type: 'REQUEST_DATA', resource: 'rentals' });
  const res = await bwmAxios.get(query);
  dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rentals' });
  dispatch({
    type: 'FETCH_RENTALS',
    rentals: res.data,
  });
};

export const fetchRentalById = (rentalId) => async (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'rental' });
  const res = await bwmAxios.get(`/rentals/${rentalId}`);
  dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rental' });
  dispatch({
    type: 'FETCH_RENTAL_BY_ID',
    rental: res.data,
  });
};

// POST Rental
export const createRental = (newRental) => {
  // const token = localStorage.getItem('bwm_token');
  return bwmAxios.post('/rentals', newRental);
};
