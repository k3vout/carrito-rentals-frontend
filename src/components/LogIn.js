import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/app/app';
import Alert from './modules/Alert';
import SignUp from './SignUp';

const LogIn = () => {
  const alert = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();
  const [signUpOpen, setSignUpWindow] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    dispatch(logIn(username));
  };
  const openSignUpPopUp = () => {
    setSignUpWindow(true);
  };
  return (
    <div>
      {alert ? <Alert message={alert} /> : false }
      Username:
      <input type="text" placeholder="Place you name here" onChange={(e) => setUsername(e.target.value)} />
      <button type="button" onClick={() => { handleSubmit(); }}>Sign in</button>
      <button type="button" onClick={() => { openSignUpPopUp(); }}>SignUp</button>
      {signUpOpen ? <SignUp /> : false}
    </div>
  );
};

export default LogIn;
