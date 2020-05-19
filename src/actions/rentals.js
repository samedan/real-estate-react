import axiosService from '../services/AxiosService';
import { deleteResource } from '.';
import { extractApiErrors } from '.';
const { bwmAxios } = axiosService;

export const verifyRentalOwner = (rentalId) => {
  return bwmAxios.get(`/rentals/${rentalId}/verify-user`);
};

export const fetchRentals = (location) => (dispatch) => {
  const query = location ? `/rentals?city=${location}` : '/rentals';
  dispatch({ type: 'REQUEST_DATA', resource: 'rentals' });
  bwmAxios.get(query).then((res) => {
    const rentals = res.data;
    dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rentals' });
    dispatch({
      type: 'FETCH_RENTALS',
      rentals,
    });
  });
};

export const fetchUserRentals = () => (dispatch) => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-rentals' });
  return bwmAxios
    .get('/rentals/me')
    .then((res) => res.data)
    .then((rentals) => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: rentals,
        resource: 'manage-rentals',
      });
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

// POST
export const createRental = (rental) => {
  return bwmAxios.post('/rentals', rental);
};

// PATCH
export const updateRental = (id, rentalData) => (dispatch) => {
  return (
    bwmAxios
      .patch(`/rentals/${id}`, rentalData)
      .then((res) => res.data)
      // 'updatedRental' is the 'res' from server
      .then((updatedRental) =>
        dispatch({
          type: 'UPDATE_RENTAL_SUCCESS',
          rental: updatedRental,
        })
      )
      .catch((error) => Promise.reject(extractApiErrors(error.response || [])))
  );
};

// DELETE
export const deleteRental = (rentalId) => (dispatch) => {
  return dispatch(
    deleteResource({
      url: `/rentals/${rentalId}`,
      resource: 'manage-rentals',
    })
  );
};
