import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import LogIn from '../components/LogIn';
import store from '../redux/configureStore';

describe('Carrito Rental', () => {
  it('Renders login page:', () => {
    render(<Provider store={store}><LogIn /></Provider>);
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('LogIn snapshot test', () => {
    const myrender = render(
      <Provider store={store}>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </Provider>,
    );
    expect(myrender).toMatchSnapshot();
  });
});
