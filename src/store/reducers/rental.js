import { combineReducers } from 'redux';
import { isFetchingReducer } from './common';

const initRentalReducer = () => {
  const item = (state = {}, action) => {
    switch (action.type) {
      case 'UNMOUNT_RENTAL':
        return {};
      case 'FETCH_RENTAL_BY_ID':
      case 'UPDATE_RENTAL_SUCCESS':
        return action.rental;
      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer('rental');

  return combineReducers({
    item,
    isFetching,
  });
};

const rental = initRentalReducer();

export default rental;
