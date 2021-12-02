import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import store from './redux/configureStore';
import App from './App';

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default Index;
