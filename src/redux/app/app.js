import storageAvailable from '../../components/utilities/storage';

// --------- PATHS ------------------------------
const USER_LOGGED_STATE = 'REDUX/APP/APP/USER_LOGGED_STATE';
const LOG_IN = 'REDUX/APP/APP/LOG_IN';
const SIGN_UP = 'REDUX/APP/APP/SIGN_UP';
const DISPLAY_ALERT = 'REDUX/APP/APP/DISPLAY_ALERT';
const CHECK_TOKEN = 'REDUX/APP/APP/CHECK_TOKEN';
const UPDATE_ALL_CARS = 'REDUX/APP/APP/UPDATE_ALL_CARS';
const UPDATE_SINGLE_CAR = 'REDUX/APP/APP/UPDATE_SINGLE_CAR';
const TRIGGER_CAR_LIST = 'REDUX/APP/APP/TRIGGER_CAR_LIST';
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
const triggerCarList = (payload) => ({
  type: TRIGGER_CAR_LIST,
  payload,
});
const updateAllCars = (payload) => ({
  type: UPDATE_ALL_CARS,
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
const dataDefaultState = {
  allCars: false,
  singleCar: false,
};
const dataReducer = (state = dataDefaultState, action) => {
  const newObj = { state };
  switch (action.type) {
    case UPDATE_ALL_CARS:
      newObj.allCars = action.payload;
      return newObj;
    case UPDATE_SINGLE_CAR:
      newObj.singleCar = action.payload;
      return newObj;
    default:
      return state;
  }
};
// ------------ MIDDLEWARES -------------------
const fetchDataFromAPIMiddleware = (store) => (next) => (action) => {
  // ------------- middleware parameters ------------
  const APIurl = 'https://carrito-rentals-backend.herokuapp.com';
  // ------------- middleware functions -------------
  const fetchUrl = (url, endpoint, httpmethod, callback, auth = '') => {
    fetch(`${url}${endpoint}`, {
      method: httpmethod,
      body: JSON.stringify({
        username: action.payload,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: auth,
      },
    }).then((response) => response.json())
      .then((json) => callback(json));
  };
  const logInTest = (json) => {
    if (json.token) {
      if (storageAvailable('sessionStorage')) {
        sessionStorage.setItem('prvTkn', JSON.stringify(json.token));
      }
      store.dispatch(setUserLoggedState(true));
    } else {
      store.dispatch(displayAlert('User doesn\'t exist'));
    }
  };
  const validateToken = (json) => {
    if (json.auth) {
      store.dispatch(setUserLoggedState(true));
    } else {
      store.dispatch(setUserLoggedState(false));
      store.dispatch(displayAlert('Please log in to continue'));
    }
  };
  const dispatchToDataStorage = (json) => {
    store.dispatch(updateAllCars(json));
  };
  // ------------ middleware actions ----------------------------
  if (action.type === CHECK_TOKEN) {
    fetchUrl(APIurl, '/v1/validate', 'POST', validateToken, action.payload);
  }

  if (action.type === LOG_IN) {
    fetchUrl(APIurl, '/v1/signin', 'POST', logInTest);
  }

  if (action.type === TRIGGER_CAR_LIST) {
    fetch(`${APIurl}/v1/cars`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: action.payload,
      },
    }).then((response) => response.json())
      .then((json) => dispatchToDataStorage(json));
  }
  next(action);
};

// -------------- EXPORTS -------------------
export {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  alertReducer,
  dataReducer,
  // -------------- actions ----------------+
  setUserLoggedState,
  logIn,
  signUp,
  checkToken,
  displayAlert,
  triggerCarList,
  // ------------- middlewares -------------
  fetchDataFromAPIMiddleware,
};
