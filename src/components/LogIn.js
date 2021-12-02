import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoggedState } from '../redux/app/app';
import SignUp from './SignUp';

const LogIn = () => {
  const dispatch = useDispatch();
  const [signUpOpen, setSignUpWindow] = useState(false);

  const handleSubmit = () => {
    dispatch(setUserLoggedState(true));
  };
  const openSignUpPopUp = () => {
    setSignUpWindow(true);
  };
  return (
    <div>
      <form onSubmit={() => { handleSubmit(); }}>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" placeholder="Type here your username" />
        </label>
        <input type="submit" value="Log In" />
      </form>
      <button type="button" onClick={() => { openSignUpPopUp(); }}>SignUp</button>
      {signUpOpen ? <SignUp /> : false}
    </div>
  );
};

export default LogIn;
