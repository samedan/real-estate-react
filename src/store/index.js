import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rentals from './reducers/rentals';
import rental from './reducers/rental';
import auth from './reducers/auth';
import manage from './reducers/manage';

export function initStore() {
  const reducers = combineReducers({
    rentals,
    rental,
    auth,
    manage,
  });

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const enhancer = composeEnhancers(
    // applyMiddleware(...middleware),
    applyMiddleware(thunk)
    // other store enhancers if any
  );

  // const store = createStore(reducers, reduxExtension);
  const store = createStore(reducers, enhancer);

  return store;
}
