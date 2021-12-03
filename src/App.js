import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cars from './components/Cars';
import NewCar from './components/NewCar';
import DeleteCar from './components/DeleteCar';
import MyRentals from './components/MyRentals';
import NewRental from './components/NewRental';
import LogIn from './components/LogIn';
import storageAvailable from './components/utilities/storage';
import { checkToken, displayAlert, setUserLoggedState } from './redux/app/app';
import logo from './images/assets/logo.png';

const App = () => {
  const loggedState = useSelector((state) => state.userLoggedStateReducer);
  const dispatch = useDispatch();

  const validateLogIn = () => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(checkToken(JSON.parse(sessionStorage.getItem('prvTkn'))));
      } else {
        dispatch(setUserLoggedState(false));
        dispatch(displayAlert('Please log in to continue'));
      }
    }
  };
  useEffect(() => {
    validateLogIn();
  }, []);
  return (
    loggedState.userLogged
      ? (
        <Router>
          <div className="d-flex flex-row bd-highlight mb-3">
            <div className="d-flex flex-column justify-content-between ps-3 bg-light w-auto shadow-lg">
              <img src={logo} className="img-fluid mt-5 p-4" alt="..." />
              <ul className="nav rounded-start flex-column fw-bold">
                <li className="nav-item">
                  <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/home">Cars</NavLink>
                </li>
                <li className="nav-link link-dark">
                  <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/newcar">New car</NavLink>
                </li>
                <li className="nav-link link-dark">
                  <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/deletecar">Delete car</NavLink>
                </li>
                <li className="nav-link link-dark">
                  <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/myrentals">My Rentals</NavLink>
                </li>
                <li className="nav-link link-dark">
                  <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/newrent">New rental</NavLink>
                </li>
              </ul>
            </div>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home">
                <Cars />
              </Route>
              <Route path="/newcar">
                <NewCar />
              </Route>
              <Route path="/deletecar">
                <DeleteCar />
              </Route>
              <Route path="/myrentals">
                <MyRentals />
              </Route>
              <Route path="/newrent">
                <NewRental />
              </Route>
            </Switch>
          </div>
        </Router>
      ) : <LogIn />
  );
};

export default App;
