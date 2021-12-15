import fetchUrl from '../../components/utilities/fetcher';
import storageAvailable from '../../components/utilities/storage';

// --------- PATHS ------------------------------
const [
  USER_LOGGED_STATE,
  LOG_IN,
  SIGN_UP,
  DISPLAY_ALERT,
  CHECK_TOKEN,
  UPDATE_ALL_CARS,
  UPDATE_SINGLE_CAR,
  TRIGGER_CAR_LIST,
  TRIGGER_SINGLE_CAR,
  ADD_NEW_CAR,
  ADD_NEW_RENT,
  TRIGGER_RENTALS_LIST,
  UPDATE_RENTAL_LIST,
  TRIGGER_MY_CAR_LIST,
  UPDATE_MY_CAR_LIST,
  STORE_EFIMEROUS_DATA,
  DELETE_CAR,
  SET_CAR_TO_RENT,
] = [
  'REDUX/APP/APP/USER_LOGGED_STATE',
  'REDUX/APP/APP/LOG_IN',
  'REDUX/APP/APP/SIGN_UP',
  'REDUX/APP/APP/DISPLAY_ALERT',
  'REDUX/APP/APP/CHECK_TOKEN',
  'REDUX/APP/APP/UPDATE_ALL_CARS',
  'REDUX/APP/APP/UPDATE_SINGLE_CAR',
  'REDUX/APP/APP/TRIGGER_CAR_LIST',
  'REDUX/APP/APP/TRIGGER_SINGLE_CAR',
  'REDUX/APP/APP/ADD_NEW_CAR',
  'REDUX/APP/APP/ADD_NEW_RENT',
  'REDUX/APP/APP/TRIGGER_RENTALS_LIST',
  'REDUX/APP/APP/UPDATE_RENTAL_LIST',
  'REDUX/APP/APP/TRIGGER_MY_CAR_LIST',
  'REDUX/APP/APP/UPDATE_MY_CAR_LIST',
  'REDUX/APP/APP/STORE_EFIMEROUS_DATA',
  'REDUX/APP/APP/DELETE_CAR',
  'REDUX/APP/APP/SET_CAR_TO_RENT',
];
// -------------ACTIONS -----------------------
const actions = {
  setUserLoggedState: (payload) => ({
    type: USER_LOGGED_STATE,
    payload,
  }),
  logIn: (payload) => ({
    type: LOG_IN,
    payload,
  }),
  signUp: (payload) => ({
    type: SIGN_UP,
    payload,
  }),
  displayAlert: (payload) => ({
    type: DISPLAY_ALERT,
    payload,
  }),
  checkToken: (payload) => ({
    type: CHECK_TOKEN,
    payload,
  }),
  triggerCarList: (payload) => ({
    type: TRIGGER_CAR_LIST,
    payload,
  }),
  triggerSingleCar: (payload) => ({
    type: TRIGGER_SINGLE_CAR,
    payload,
  }),
  updateSingleCar: (payload) => ({
    type: UPDATE_SINGLE_CAR,
    payload,
  }),
  updateAllCars: (payload) => ({
    type: UPDATE_ALL_CARS,
    payload,
  }),
  addNewCar: (payload) => ({
    type: ADD_NEW_CAR,
    payload,
  }),
  addNewRent: (payload) => ({
    type: ADD_NEW_RENT,
    payload,
  }),
  triggerRentalsList: (payload) => ({
    type: TRIGGER_RENTALS_LIST,
    payload,
  }),
  updateRentalsList: (payload) => ({
    type: UPDATE_RENTAL_LIST,
    payload,
  }),
  triggerMyCarsList: (payload) => ({
    type: TRIGGER_MY_CAR_LIST,
    payload,
  }),
  updateMyCarsList: (payload) => ({
    type: UPDATE_MY_CAR_LIST,
    payload,
  }),
  storeEfimerousData: (payload) => ({
    type: STORE_EFIMEROUS_DATA,
    payload,
  }),
  deleteCar: (payload) => ({
    type: DELETE_CAR,
    payload,
  }),
  setCarToRent: (payload) => ({
    type: SET_CAR_TO_RENT,
    payload,
  }),
};

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
  rentalList: false,
  myCarsList: false,
  efimerousData: false,
  carToRent: false,
};
const dataReducer = (state = dataDefaultState, action) => {
  const newObj = {
    allCars: state.allCars,
    singleCar: state.singleCar,
    rentalList: state.rentalList,
    myCarsList: state.myCarsList,
    efimerousData: state.efimerousData,
    carToRent: state.carToRent,
  };
  switch (action.type) {
    case UPDATE_ALL_CARS:
      newObj.allCars = action.payload;
      return newObj;
    case UPDATE_SINGLE_CAR:
      newObj.singleCar = action.payload;
      return newObj;
    case UPDATE_RENTAL_LIST:
      newObj.rentalList = action.payload;
      return newObj;
    case UPDATE_MY_CAR_LIST:
      newObj.myCarsList = action.payload;
      return newObj;
    case STORE_EFIMEROUS_DATA:
      newObj.efimerousData = action.payload;
      return newObj;
    case SET_CAR_TO_RENT:
      newObj.carToRent = action.payload;
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
  const logInTest = (json) => {
    if (json.token) {
      if (storageAvailable('sessionStorage')) {
        sessionStorage.setItem('prvTkn', JSON.stringify(json.token));
        sessionStorage.setItem('usrId', JSON.stringify(json.id));
      }
      store.dispatch(actions.setUserLoggedState(true));
    } else {
      store.dispatch(actions.displayAlert('User doesn\'t exist'));
    }
  };
  const validateToken = (json) => {
    if (json.auth) {
      store.dispatch(actions.setUserLoggedState(true));
    } else {
      store.dispatch(actions.setUserLoggedState(false));
      store.dispatch(actions.displayAlert('Please log in to continue'));
    }
  };
  const dispatchToDataStorage = (json) => {
    store.dispatch(actions.updateAllCars(json));
  };
  const dispatchToDataStorageTwo = (json) => {
    store.dispatch(actions.updateSingleCar(json));
  };
  const dispatchToRentalsList = (json) => {
    store.dispatch(actions.updateRentalsList(json));
  };
  const storeEfimerousData = (json) => {
    store.dispatch(actions.storeEfimerousData(json));
  };
  const dispatchToDataStorageThree = (json) => {
    store.dispatch(actions.updateMyCarsList(json));
  };
  const triggerMyCarsListCallback = (json) => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        store.dispatch(actions.triggerMyCarsList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
    store.dispatch(actions.storeEfimerousData(json));
  };
  const dispatchNewUser = (json) => {
    if (json.status === 'bad') {
      store.dispatch(actions.displayAlert('User already exist'));
    } else {
      store.dispatch(actions.logIn(json.username));
    }
  };
  // ------------ middleware actions ----------------------------
  if (action.type === CHECK_TOKEN) {
    fetchUrl(APIurl, '/v1/validate', 'POST', validateToken, false, action.payload);
  }
  if (action.type === LOG_IN) {
    const logInBody = {
      username: action.payload,
    };
    fetchUrl(APIurl, '/v1/signin', 'POST', logInTest, logInBody, false);
  }
  if (action.type === SIGN_UP) {
    const signUpBody = {
      username: action.payload,
    };
    fetchUrl(APIurl, '/v1/signup', 'POST', dispatchNewUser, signUpBody, false);
  }
  if (action.type === TRIGGER_RENTALS_LIST) {
    fetchUrl(APIurl, '/v1/rentals', 'GET', dispatchToRentalsList, false, action.payload);
  }
  if (action.type === TRIGGER_CAR_LIST) {
    fetchUrl(APIurl, '/v1/cars', 'GET', dispatchToDataStorage, false, action.payload);
  }
  if (action.type === TRIGGER_SINGLE_CAR) {
    fetchUrl(APIurl, `/v1/cars/${action.payload.id}`, 'GET', dispatchToDataStorageTwo, false, action.payload.token);
  }
  if (action.type === TRIGGER_MY_CAR_LIST) {
    fetchUrl(APIurl, '/v1/mycars', 'GET', dispatchToDataStorageThree, false, action.payload);
  }
  if (action.type === DELETE_CAR) {
    fetchUrl(APIurl, `/v1/cars/${action.payload.id}`, 'DELETE', triggerMyCarsListCallback, false, action.payload.token);
  }
  if (action.type === ADD_NEW_CAR) {
    const addNewCarBody = {
      brand: action.payload.brand,
      model: action.payload.model,
      seats_number: action.payload.seats_number,
      transmision: action.payload.transmision,
      mileage: action.payload.mileage,
      image: action.payload.image,
      price_for_day: action.payload.price_for_day,
      bags_number: action.payload.bags_number,
    };
    fetchUrl(APIurl, '/v1/cars', 'POST', storeEfimerousData, addNewCarBody, action.payload.token);
  }
  if (action.type === ADD_NEW_RENT) {
    const addNewRentBody = {
      car_id: action.payload.car_id,
      city: action.payload.city,
      start_date: action.payload.start_date,
      end_date: action.payload.end_date,
    };
    fetchUrl(APIurl, '/v1/rentals', 'POST', storeEfimerousData, addNewRentBody, action.payload.token);
  }
  if (action.type) next(action);
};

// -------------- EXPORTS -------------------
export {
  // -------------- reducers ---------------
  userLoggedStateReducer,
  alertReducer,
  dataReducer,
  // -------------- actions ----------------+
  actions,
  // ------------- middlewares -------------
  fetchDataFromAPIMiddleware,
};
