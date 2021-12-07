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
    newAdvice.className = 'text-danger';
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
    <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-gradient custom-bg overflow-scroll">
      <div>
        <h1 className="display-3 text-center pt-5">Rent your Carrito</h1>
        <p className="text-center pb-5 px-3">Add your car details and start earning money</p>
      </div>
      <div className="text-center d-flex flex-column mx-auto form-width px-5 custom-position">
        <div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Brand:
              </div>
            </div>
            <div className="col-auto" id="brand_field">
              <input
                onChange={(e) => { handleInputChange('brand', e.target.value); }}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Model:
              </div>
            </div>
            <div className="col-auto" id="model_field">
              <input
                onChange={(e) => { handleInputChange('model', e.target.value); }}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Seats Number:
              </div>
            </div>
            <div className="col-auto" id="seats_number_field">
              <input
                onChange={(e) => { handleInputChange('seats_number', e.target.value); }}
                type="number"
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Transmision:
              </div>
            </div>
            <div className="col-auto" id="transmision_field">
              <select
                onChange={(e) => { handleInputChange('transmision', e.target.value); }}
                className="form-select form-control"
              >
                <option value="" disabled selected>Choose an option</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Mileage:
              </div>
            </div>
            <div className="col-auto" id="mileage_field">
              <input
                id="mileage_input"
                min="0"
                onChange={(e) => { handleInputChange('mileage', e.target.value); }}
                type="number"
                className="form-control"
              />
              <div className="text-end">
                <input
                  id="unlimitedBtn"
                  min="0"
                  checked={checkBox}
                  onChange={() => { handleCheckBoxChange('mileage'); }}
                  type="checkbox"
                  className="form-check-input me-2 ms-auto"
                />
                Unlimited
              </div>
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Image:
              </div>
            </div>
            <div className="col-auto" id="image_field">
              <input
                onChange={(e) => { handleInputChange('image', e.target.value); }}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Price for day:
              </div>
            </div>
            <div className="col-auto" id="price_for_day_field">
              <input
                min="0"
                onChange={(e) => { handleInputChange('price_for_day', e.target.value); }}
                type="number"
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Bags Number:
              </div>
            </div>
            <div className="col-auto" id="bags_number_field">
              <input
                min="0"
                onChange={(e) => { handleInputChange('bags_number', e.target.value); }}
                type="number"
                className="form-control"
              />
            </div>
          </div>
          <div className="text-center py-3">
            <button
              type="button"
              onClick={() => { handleSubmit(); }}
              className="btn btn-dark btn-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <p className="creators text-muted text-center">
        <small>Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo</small>
      </p>
    </div>
  );
};

export default NewCar;
