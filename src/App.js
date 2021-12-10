import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Cars from './components/Cars';
import NewCar from './components/NewCar';
import SingleCar from './components/SingleCar';
import DeleteCar from './components/DeleteCar';
import MyRentals from './components/MyRentals';
import NewRental from './components/NewRental';
import LogIn from './components/LogIn';
import storageAvailable from './components/utilities/storage';
import { actions } from './redux/app/app';
import logo from './images/assets/logo.png';

const App = () => {
  const loggedState = useSelector((state) => state.userLoggedStateReducer);
  const dispatch = useDispatch();

  const validateLogIn = () => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(actions.checkToken(JSON.parse(sessionStorage.getItem('prvTkn'))));
      } else {
        dispatch(actions.setUserLoggedState(false));
        dispatch(actions.displayAlert('Please log in to continue'));
      }
    }
  };
  const handleLogOutBtn = () => {
    if (storageAvailable('sessionStorage')) {
      sessionStorage.removeItem('prvTkn');
    }
    window.location.reload();
  };
  useEffect(() => {
    validateLogIn();
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        const token = JSON.parse(sessionStorage.getItem('prvTkn'));
        dispatch(actions.triggerCarList(token));
      }
    }
  }, []);
  return (
    loggedState.userLogged
      ? (
        <Router>
          <div className="d-flex flex-row bd-highlight mb-3">
            <div className="d-flex flex-column justify-content-between ps-3 bg-light w-auto shadow-lg">
              <img src={logo} className="img-fluid mt-5 p-4" alt="..." />
              <Nav
                activeKey="/home"
                className="flex-column"
              >
                <ul className="nav rounded-start flex-column fw-bold">
                  <li className="nav-link link-dark">
                    <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none" to="/home">Cars</NavLink>
                  </li>
                  <li className="nav-link link-dark">
                    <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none" to="/newcar">New car</NavLink>
                  </li>
                  <li className="nav-link link-dark">
                    <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none" to="/deletecar">Delete car</NavLink>
                  </li>
                  <li className="nav-link link-dark">
                    <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none" to="/myrentals">My Rentals</NavLink>
                  </li>
                  <li className="nav-link link-dark">
                    <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none" to="/newrent">New rental</NavLink>
                  </li>
                </ul>
              </Nav>
              <div>
                <p className="text-muted text-center pe-3 m-0">
                  <small>Share your ride: </small>
                </p>
                <div className="d-flex justify-content-center mb-2 pe-3">
                  <span>
                    <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                  </span>
                </div>
              </div>
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
              <Route path="/detail">
                <SingleCar />
              </Route>
            </Switch>
          </div>
          <Button onClick={() => { handleLogOutBtn(); }} className="position-absolute top-0 end-0 m-3 btn-sm" variant="outline-secondary">Log Out</Button>
        </Router>
      ) : <LogIn />
  );
};

export default App;
