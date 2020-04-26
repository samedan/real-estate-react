import { rentalData } from '../store/data';

export const fetchRentals = () => {
  return {
    type: 'FETCH_RENTALS',
    rentals: rentalData,
  };
};

export const createRental = (newRental) => {
  return {
    type: 'CREATE_RENTAL',
    rental: newRental,
  };
};
