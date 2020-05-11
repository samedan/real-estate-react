import axiosService from '../services/AxiosService';
const { bwmAxios } = axiosService;

export const fetchRentals = () => async (dispatch) => {
  const res = await bwmAxios.get('/rentals');
  dispatch({
    type: 'FETCH_RENTALS',
    rentals: res.data,
  });
};

export const fetchRentalById = (rentalId) => async (dispatch) => {
  dispatch({ type: 'IS_FETCHING_RENTAL' });
  const res = await bwmAxios.get(`/rentals/${rentalId}`);
  dispatch({
    type: 'FETCH_RENTAL_BY_ID',
    rental: res.data,
  });
};

// POST Rental
export const createRental = (newRental) => {
  const token = localStorage.getItem('bwm_token');
  return bwmAxios.post('/rentals', newRental);
};
