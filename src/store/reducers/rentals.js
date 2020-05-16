// PURE FUNCTION
// Dont mutate arguments
// No API calls, no route transitions
import { combineReducers } from 'redux';
import { isFetchingReducer } from './common';

const initRentalsReducer = () => {
  const items = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RENTALS':
        return action.rentals;
      case 'CREATE_RENTAL':
        return [...state, action.rental];
      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer('rentals');

  return combineReducers({
    items,
  });
};

const rentals = initRentalsReducer();

export default rentals;
