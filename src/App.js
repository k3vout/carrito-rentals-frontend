import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from './redux/app/app';
import Greetings from './components/Greetings';

const App = () => {
  const state = useSelector((state) => state.messagesReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMessages());
  }, []);
  return (
    <div>
      <Greetings greeting={state.message} />
    </div>
  );
};

export default App;
