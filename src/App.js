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
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
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
          <div className="d-flex flex-row bd-highlight vh-100">
            <Navbar expand="lg">
              <Container className="vh-100 p-0 shadow-lg overflow-hidden bg-light w-auto">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler bg-warning p-1 m-2 align-self-start" />
                <Navbar.Collapse className="m-0 p-0" id="responsive-navbar-nav">
                  <Nav className="navbar navbar-expand-lg navbar-light bg-light mark p-0">
                    <div className="menu-container d-flex flex-column justify-content-between vh-100">
                      <img src={logo} className="img-fluid mt-5 p-4" alt="..." />
                      <div
                        activeKey="/home"
                        className="flex-column"
                      >
                        <ul className="nav rounded-start flex-column fw-bold">
                          <li className="nav-link link-dark pe-0">
                            <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none ps-2" to="/home">Cars</NavLink>
                          </li>
                          <li className="nav-link link-dark pe-0">
                            <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none ps-2" to="/newcar">New car</NavLink>
                          </li>
                          <li className="nav-link link-dark pe-0">
                            <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none ps-2" to="/deletecar">Delete car</NavLink>
                          </li>
                          <li className="nav-link link-dark pe-0">
                            <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none ps-2" to="/myrentals">My Rentals</NavLink>
                          </li>
                          <li className="nav-link link-dark pe-0">
                            <NavLink onClick={() => { validateLogIn(); }} activeClassName="nav-link text-dark active bg-warning bg-gradient rounded-start shadow-sm" className="link-dark text-decoration-none ps-2" to="/newrent">New rental</NavLink>
                          </li>
                        </ul>
                      </div>
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
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
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
