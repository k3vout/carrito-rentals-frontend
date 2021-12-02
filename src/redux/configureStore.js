import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
// ----------- STORE IMPORTS -----------
import {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  // -------------- actions ----------------
  // ------------- middlewares -------------
  // fetchMessagesFromAPIMiddleware,
} from './app/app';

const reducer = combineReducers({
  // ------------ Store Reducers -----
  userLoggedStateReducer,
});

const composedEnhancer = compose(
  // ------------ Store Middlewares -----
  // applyMiddleware(fetchMessagesFromAPIMiddleware),
  // ------------- Logger --------------
  applyMiddleware(logger),
);

const store = createStore(
  reducer,
  undefined,
  composedEnhancer,
);

export default store;
