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
          <div>
            <img src="logo.png" alt="..." />
            <ul>
              <li>
                <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/home">Cars</NavLink>
              </li>
              <li>
                <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/newcar">New car</NavLink>
              </li>
              <li>
                <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/deletecar">Delete car</NavLink>
              </li>
              <li>
                <NavLink onClick={() => { validateLogIn(); }} activeClassName="pressed_link" className="unpressed_link" to="/myrentals">My Rentals</NavLink>
              </li>
              <li>
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
        </Router>
      ) : <LogIn />
  );
};

export default App;
