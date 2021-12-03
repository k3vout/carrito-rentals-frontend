import storageAvailable from '../../components/utilities/storage';

// --------- PATHS ------------------------------
const USER_LOGGED_STATE = 'REDUX/APP/APP/USER_LOGGED_STATE';
const LOG_IN = 'REDUX/APP/APP/LOG_IN';
const SIGN_UP = 'REDUX/APP/APP/SIGN_UP';
const DISPLAY_ALERT = 'REDUX/APP/APP/DISPLAY_ALERT';
const CHECK_TOKEN = 'REDUX/APP/APP/CHECK_TOKEN';
// -------------ACTIONS -----------------------
const setUserLoggedState = (payload) => ({
  type: USER_LOGGED_STATE,
  payload,
});
const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});
const signUp = (payload) => ({
  type: SIGN_UP,
  payload,
});
const displayAlert = (payload) => ({
  type: DISPLAY_ALERT,
  payload,
});
const checkToken = (payload) => ({
  type: CHECK_TOKEN,
  payload,
});

// ----------- REDUCERS ----------------------

const defaultValues = {
  userLogged: false,
};

const userLoggedStateReducer = (state = defaultValues, action) => {
  const newObj = { state };
  switch (action.type) {
    case USER_LOGGED_STATE:
      newObj.userLogged = action.payload;
      return newObj;
    default:
      return state;
  }
};
const alertReducer = (state = false, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return action.payload;
    default:
      return state;
  }
};
// ------------ MIDDLEWARES -------------------

const fetchDataFromAPIMiddleware = (store) => (next) => (action) => {
  const logInTest = (json) => {
    if (json.token) {
      if (storageAvailable('sessionStorage')) {
        sessionStorage.setItem('prvTkn', JSON.stringify(json.username));
      }
      store.dispatch(setUserLoggedState(true));
    } else {
      store.dispatch(displayAlert('User doesn\'t exist'));
    }
  };
  if (action.type === LOG_IN) {
    fetch('https://carrito-rentals-backend.herokuapp.com/v1/signin', {
      method: 'POST',
      body: JSON.stringify({
        username: action.payload,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((json) => logInTest(json));
  }
  const validateToken = (json) => {
    if (json.username === action.payload) {
      console.log('got here too');
      store.dispatch(setUserLoggedState(true));
    } else {
      console.log('got here');
      store.dispatch(setUserLoggedState(false));
      store.dispatch(displayAlert('Please log in to continue'));
    }
  };
  if (action.type === CHECK_TOKEN) {
    fetch('https://carrito-rentals-backend.herokuapp.com/v1/signin', {
      method: 'POST',
      body: JSON.stringify({
        username: action.payload,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((json) => validateToken(json));
  }
  next(action);
};

// -------------- EXPORTS -------------------
export {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  alertReducer,
  // -------------- actions ----------------+
  setUserLoggedState,
  logIn,
  signUp,
  checkToken,
  displayAlert,
  // ------------- middlewares -------------
  fetchDataFromAPIMiddleware,
};
