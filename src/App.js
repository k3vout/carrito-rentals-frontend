import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import Cars from './components/Cars';
import NewCar from './components/NewCar';
import DeleteCar from './components/DeleteCar';
import MyRentals from './components/MyRentals';
import NewRental from './components/NewRental';

const App = () => (
  <Router>
    <NavLink activeClassName="pressed_link" className="unpressed_link" to="/home">Cars</NavLink>
    <NavLink activeClassName="pressed_link" className="unpressed_link" to="/newcar">New car</NavLink>
    <NavLink activeClassName="pressed_link" className="unpressed_link" to="/deletecar">Delete car</NavLink>
    <NavLink activeClassName="pressed_link" className="unpressed_link" to="/myrentals">My Rentals</NavLink>
    <NavLink activeClassName="pressed_link" className="unpressed_link" to="/newrent">New rental</NavLink>
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
);

export default App;
