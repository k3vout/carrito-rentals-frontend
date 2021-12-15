import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
// ----------- STORE IMPORTS -----------
import {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  alertReducer,
  dataReducer,
  // -------------- actions ----------------
  // ------------- middlewares -------------
  fetchDataFromAPIMiddleware,
} from './app/app';

const reducer = combineReducers({
  // ------------ Store Reducers -----
  userLoggedStateReducer,
  alertReducer,
  dataReducer,
});

const composedEnhancer = compose(
  // ------------ Store Middlewares -----
  applyMiddleware(fetchDataFromAPIMiddleware),
  applyMiddleware(logger),
);

const store = createStore(
  reducer,
  undefined,
  composedEnhancer,
);

export default store;
