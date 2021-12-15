import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import LogIn from '../components/LogIn';
import store from '../redux/configureStore';
import NewRental from '../components/NewRental';
import NewCar from '../components/NewCar';
import DeleteCar from '../components/DeleteCar';

describe('Carrito Rental', () => {
  it('Renders input field:', () => {
    render(<Provider store={store}><LogIn /></Provider>);
    const input = document.getElementById('loginInput');
    fireEvent.change(input, {target: {value: 'hunter4466'}});
    const button = document.getElementById('loginBtn');
    button.click();
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('Renders register button:', () => {
    render(<Provider store={store}><LogIn /></Provider>);
    const input = document.getElementById('loginInput');
    fireEvent.change(input, {target: {value: 'hunter4466'}});
    const button = document.getElementById('loginBtn');
    button.click();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('Renders new rental form:', () => {
    render(<Provider store={store}><NewCar /></Provider>);
    expect(screen.getByText('Model:')).toBeInTheDocument();
  });

  it('Renders loading screen:', () => {
    render(<Provider store={store}><DeleteCar /></Provider>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});