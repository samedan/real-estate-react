import { rentalData } from '../store/data';

export const fetchRentals = () => {
  return {
    type: 'FETCH_RENTALS',
    rentals: rentalData,
  };
};

export const fetchRentalById = (rentalId) => {
  const rental = rentalData.find((rental) => rental._id === rentalId);
  return {
    type: 'FETCH_RENTAL_BY_ID',
    rental: rental,
  };
};

export const createRental = (newRental) => {
  return {
    type: 'CREATE_RENTAL',
    rental: newRental,
  };
};
