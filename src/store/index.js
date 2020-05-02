import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rentals from './reducers/rentals';
import rental from './reducers/rental';

const addPromiseToDispatch = (store) => {
  const { dispatch } = store;

  // override 'dispatch'
  return function (action) {
    // if action is function , a promise action wait until action is resolved
    if (action.then && typeof action.then === 'function') {
      return action.then((action) => {
        dispatch(action);
      });
    }
    dispatch(action);
  };
};

export function initStore() {
  const reducers = combineReducers({
    rentals,
    rental,
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

  store.dispatch = addPromiseToDispatch(store);

  return store;
}
