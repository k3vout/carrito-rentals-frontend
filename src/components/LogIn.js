import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/app/app';
import Alert from './modules/Alert';
import SignUp from './SignUp';
import splash from '../images/assets/carrito-splash.png';

const LogIn = () => {
  const alert = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();
  const [signUpOpen, setSignUpWindow] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    dispatch(actions.logIn(username));
  };
  const openSignUpPopUp = () => {
    setSignUpWindow(true);
  };
  return (
    <div className="vh-100 text-center bg-warning d-flex flex-column justify-content-center">
      <div>
        <img
          src={splash}
          id="slide"
          className="carrito-splash-pic"
          alt="Carrito Logo"
        />
      </div>
      {alert ? <Alert message={alert} /> : false }
      <div className="input-group mb-5 align-self-center username">
        <span className="input-group-text">@</span>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="form-control" />
      </div>
      <div className="input-group mb-5 align-self-center username text-center justify-content-center">
        <button type="button" onClick={() => { handleSubmit(); }} className="btn btn-dark btn-sm mx-1">Log in</button>
        <button type="button" onClick={() => { openSignUpPopUp(); }} className="btn btn-dark btn-sm mx-1">Sign Up</button>
      </div>
      {signUpOpen ? <SignUp /> : false}
    </div>
  );
};

export default LogIn;
