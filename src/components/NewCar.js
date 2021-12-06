import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  addNewCar,
  checkToken,
  displayAlert,
  setUserLoggedState,
} from '../redux/app/app';
import storageAvailable from './utilities/storage';

const NewCar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputDefaultState = {
    brand: '',
    model: '',
    seats_number: 0,
    transmision: '',
    mileage: '',
    image: '',
    price_for_day: 0,
    bags_number: 0,
  };
  const [inputs, updateInputs] = useState(inputDefaultState);
  const [checkBox, updateCheckbox] = useState(false);
  const handleInputChange = (type, value) => {
    const keys = Object.keys(inputs);
    const newObj = {};
    keys.forEach((e) => {
      newObj[e] = inputs[e];
    });
    newObj[type] = value;
    updateInputs(newObj);
    if (type === 'mileage' && value !== 'Unlimited') {
      updateCheckbox(false);
    }
  };
  const appendNotification = (id, string) => {
    const parent = document.getElementById(id);
    const newAdvice = document.createElement('p');
    newAdvice.className = 'validation_style';
    newAdvice.innerHTML = string;
    newAdvice.id = 'add_new_car_notification';
    parent.appendChild(newAdvice);
  };
  const validator = () => {
    let validation = true;
    if (inputs.brand.length < 1) {
      validation = false;
      appendNotification('brand_field', 'Brand must not be empty');
    }
    if (inputs.model.length < 1) {
      validation = false;
      appendNotification('model_field', 'Model must not be empty');
    }
    if (parseInt(inputs.seats_number, 10) < 1) {
      validation = false;
      appendNotification('seats_number_field', 'Number of seats must be at least 1');
    }
    if (inputs.transmision.length < 1) {
      validation = false;
      appendNotification('transmision_field', 'Transmision option must be choose');
    }
    if (inputs.mileage.length < 1) {
      validation = false;
      appendNotification('mileage_field', 'Mileage field must not be empty');
    }
    if (inputs.image.length < 1) {
      validation = false;
      appendNotification('image_field', 'Mileage field must not be empty');
    }
    if (parseInt(inputs.price_for_day, 10) < 1) {
      validation = false;
      appendNotification('price_for_day_field', 'Price for the day must be more than 0');
    }
    if (parseInt(inputs.bags_number, 10) < 1) {
      validation = false;
      appendNotification('bags_number_field', 'Bags should be at least 1');
    }
    if (validation) {
      return true;
    }
    return false;
  };
  const handleSubmit = () => {
    if (document.getElementById('add_new_car_notification')) {
      const notifications = document.querySelectorAll('#add_new_car_notification');
      notifications.forEach((e) => {
        e.remove();
      });
    }
    if (validator()) {
      const keys = Object.keys(inputs);
      const newObj = {};
      keys.forEach((e) => {
        newObj[e] = inputs[e];
      });
      if (storageAvailable('sessionStorage')) {
        if (sessionStorage.getItem('prvTkn')) {
          newObj.token = JSON.parse(sessionStorage.getItem('prvTkn'));
          dispatch(checkToken(JSON.parse(sessionStorage.getItem('prvTkn'))));
          const path = '/home';
          history.push(path);
          dispatch(addNewCar(newObj));
        } else {
          dispatch(setUserLoggedState(false));
          dispatch(displayAlert('Please log in to continue'));
        }
      }
    }
  };
  const handleCheckBoxChange = (type) => {
    if (checkBox) {
      updateCheckbox(false);
    } else {
      updateCheckbox(true);
      handleInputChange(type, 'Unlimited');
      const input = document.getElementById('mileage_input');
      input.value = '';
    }
  };

  return (
    <div>
      <div>
        <button type="button" onClick={() => { console.log(inputs); }}>Click me</button>
        <h1>Rent your Carrito</h1>
        <p>Add your car details and start earning money</p>
      </div>
      <div>
        <div>
          <div>
            <div>
              <p>Brand:</p>
            </div>
            <div id="brand_field">
              <input onChange={(e) => { handleInputChange('brand', e.target.value); }} type="text" />
            </div>
          </div>
          <div>
            <div>
              <p>Model:</p>
            </div>
            <div id="model_field">
              <input onChange={(e) => { handleInputChange('model', e.target.value); }} type="text" />
            </div>
          </div>
          <div>
            <div>
              <p>Seats Number:</p>
            </div>
            <div id="seats_number_field">
              <input onChange={(e) => { handleInputChange('seats_number', e.target.value); }} type="number" />
            </div>
          </div>
          <div>
            <div>
              <p>Transmision:</p>
            </div>
            <div id="transmision_field">
              <select onChange={(e) => { handleInputChange('transmision', e.target.value); }}>
                <option value="" disabled selected>Choose an option</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <p>Mileage:</p>
            </div>
            <div id="mileage_field">
              <input id="mileage_input" min="0" onChange={(e) => { handleInputChange('mileage', e.target.value); }} type="number" />
              <input min="0" checked={checkBox} onChange={() => { handleCheckBoxChange('mileage'); }} type="checkbox" />
            </div>
          </div>
          <div>
            <div>
              <p>Image:</p>
            </div>
            <div id="image_field">
              <input onChange={(e) => { handleInputChange('image', e.target.value); }} type="text" />
            </div>
          </div>
          <div>
            <div>
              <p>Price for day:</p>
            </div>
            <div id="price_for_day_field">
              <input min="0" onChange={(e) => { handleInputChange('price_for_day', e.target.value); }} type="number" />
            </div>
          </div>
          <div>
            <div>
              <p>Bags Number:</p>
            </div>
            <div id="bags_number_field">
              <input min="0" onChange={(e) => { handleInputChange('bags_number', e.target.value); }} type="number" />
            </div>
          </div>
          <div>
            <button type="button" onClick={() => { handleSubmit(); }}>Submit</button>
          </div>
        </div>
      </div>
      <p>
        <small>Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo</small>
      </p>
    </div>
  );
};

export default NewCar;
