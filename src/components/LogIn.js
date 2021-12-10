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
    if (signUpOpen) {
      const loginField = document.getElementById('login_field');
      loginField.className = 'align-self-center';
      setSignUpWindow(false);
    } else {
      dispatch(actions.logIn(username));
    }
  };
  const openSignUpPopUp = () => {
    const loginField = document.getElementById('login_field');
    loginField.className = `${loginField.className} d-none`;
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
      <div id="login_field" className="align-self-center">
        {alert ? <Alert message={alert} /> : false }
        <div className="input-group mb-5 username">
          <span className="input-group-text">@</span>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="form-control" />
        </div>
      </div>
      {signUpOpen ? <SignUp /> : false}
      <div className="input-group mb-5 align-self-center username text-center justify-content-center">
        <button type="button" onClick={() => { handleSubmit(); }} className="btn btn-dark btn-sm mx-1">Log in</button>
        <button type="button" onClick={() => { openSignUpPopUp(); }} className="btn btn-dark btn-sm mx-1">Sign Up</button>
      </div>
    </div>
  );
};

export default LogIn;
