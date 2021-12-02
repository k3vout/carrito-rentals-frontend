// --------- PATHS ------------------------------
const USER_LOGGED_STATE = 'REDUX/APP/APP/USER_LOGGED_STATE';
// -------------ACTIONS -----------------------
const setUserLoggedState = (payload) => ({
  type: USER_LOGGED_STATE,
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
/*
const fetchDataFromAPIMiddleware = (store) => (next) => (action) => {
  if (action.type === FETCH_MESSAGES) {
    fetch('https://hello-world-back-end-api.herokuapp.com/v1/messages', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((json) => store.dispatch(uploadMessages(json)));
  }
  next(action);
};
*/
// -------------- EXPORTS -------------------
export {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  // -------------- actions ----------------+
  setUserLoggedState,
  // ------------- middlewares -------------
};
