import { rentalData } from './data';
import { createStore, combineReducers } from 'redux';

export function initStore() {
  const reducers = combineReducers({
    rentals: () => {
      return rentalData;
    },
    data1: () => ['1', '2', '3'],
    data2: () => ['a', 'b', 'c'],
  });
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
