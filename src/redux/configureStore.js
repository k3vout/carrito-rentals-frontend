import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
// ----------- STORE IMPORTS -----------
import {
  // -------------- reducers ---------------
  messagesReducer,
  // -------------- actions ----------------
  // ------------- middlewares -------------
  fetchMessagesFromAPIMiddleware,
} from './app/app';

const reducer = combineReducers({
  // ------------ Store Reducers -----
  messagesReducer,
});

const composedEnhancer = compose(
  // ------------ Store Middlewares -----
  applyMiddleware(fetchMessagesFromAPIMiddleware),
  // ------------- Logger --------------
);

const store = createStore(
  reducer,
  undefined,
  composedEnhancer,
);

export default store;
