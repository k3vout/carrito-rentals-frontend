// --------- PATHS ------------------------------
const UPLOAD_MESSAGES = 'REDUX/APP/APP/UPLOAD_MESSAGES';
const FETCH_MESSAGES = 'REDUX/APP/APP/FETCH_MESSAGES';
// -------------ACTIONS -----------------------
const uploadMessages = (payload) => ({
  type: UPLOAD_MESSAGES,
  payload,
});
const fetchMessages = (payload) => ({
  type: FETCH_MESSAGES,
  payload,
});

// ----------- REDUCERS ----------------------

const defaultValues = {
  message: 'hello reducer',
};

const messagesReducer = (state = defaultValues, action) => {
  switch (action.type) {
    case UPLOAD_MESSAGES:
      return action.payload;
    default:
      return state;
  }
};
// ------------ MIDDLEWARES -------------------
const fetchMessagesFromAPIMiddleware = (store) => (next) => (action) => {
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
// -------------- EXPORTS -------------------
export {
  // -------------- reducers ---------------
  messagesReducer,
  // -------------- actions ----------------+
  uploadMessages,
  fetchMessages,
  // ------------- middlewares -------------
  fetchMessagesFromAPIMiddleware,
};
