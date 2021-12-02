// --------- PATHS ------------------------------
const USER_LOGGED_STATE = 'REDUX/APP/APP/USER_LOGGED_STATE';
const LOG_IN = 'REDUX/APP/APP/LOG_IN';
const SIGN_UP = 'REDUX/APP/APP/SIGN_UP';
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
// ------------ MIDDLEWARES -------------------

const fetchDataFromAPIMiddleware = () => (next) => (action) => {
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
      .then((json) => console.log(json));
  }
  next(action);
};

// -------------- EXPORTS -------------------
export {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  // -------------- actions ----------------+
  setUserLoggedState,
  logIn,
  signUp,
  // ------------- middlewares -------------
  fetchDataFromAPIMiddleware,
};
