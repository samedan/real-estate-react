import { createStore, combineReducers } from 'redux';
import rentals from './reducers/rentals';

export function initStore() {
  const reducers = combineReducers({
    rentals,
  });
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
