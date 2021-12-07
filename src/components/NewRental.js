/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PlacesAutocomplete, {
} from 'react-places-autocomplete';
import {
  addNewRent,
  checkToken,
  displayAlert,
  setUserLoggedState,
  triggerCarList,
} from '../redux/app/app';
import { miniIdGenerator } from './utilities/idgen';
import storageAvailable from './utilities/storage';

const NewRental = () => {
  const cars = useSelector((data) => data.dataReducer).allCars;
  const [cityAdd, setCityAdd] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const inputDefaultState = {
    car_id: '',
    city: '',
    start_date: '',
    end_date: '',
  };
  const [inputs, updateInputs] = useState(inputDefaultState);
  const handleInputChange = (type, value) => {
    const keys = Object.keys(inputs);
    const newObj = {};
    keys.forEach((e) => {
      newObj[e] = inputs[e];
    });
    if (type === 'city') {
      setCityAdd(value);
    }
    newObj[type] = value;
    updateInputs(newObj);
  };
  useEffect(() => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(triggerCarList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
  }, []);
  const appendNotification = (id, string) => {
    const parent = document.getElementById(id);
    const newAdvice = document.createElement('p');
    newAdvice.className = 'validation_style';
    newAdvice.innerHTML = string;
    newAdvice.id = 'add_new_reservation_notification';
    parent.appendChild(newAdvice);
  };
  const validator = () => {
    let validation = true;
    if (inputs.car_id.length < 1) {
      validation = false;
      appendNotification('car_id_field', 'You must select a car model');
    }
    if (inputs.city.length < 1) {
      validation = false;
      appendNotification('city_field', 'City field should not be empty');
    }
    if (inputs.start_date.length < 1) {
      validation = false;
      appendNotification('start_date_field', 'Please Choose a start date');
    }
    if (inputs.end_date.length < 1) {
      validation = false;
      appendNotification('end_date_field', 'Please Choose an end date');
    }
    if (validation) {
      return true;
    }
    return false;
  };
  const handleSubmit = () => {
    if (document.getElementById('add_new_reservation_notification')) {
      const notifications = document.querySelectorAll('#add_new_reservation_notification');
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
          const path = '/myrentals';
          history.push(path);
          dispatch(addNewRent(newObj));
        } else {
          dispatch(setUserLoggedState(false));
          dispatch(displayAlert('Please log in to continue'));
        }
      }
    }
  };
  return (
    <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-gradient custom-bg">
      <div>
        <h1>New rental</h1>
        <button type="button" onClick={() => { console.log(inputs); }}>Click me</button>
        <p>
          Schedule your carrito
        </p>
      </div>
      <div>
        <form>
          <div>
            <div>
              <p>Car:</p>
            </div>
            <div id="car_id_field">
              <select onChange={(e) => { handleInputChange('car_id', e.target.value); }}>
                <option selected disabled>Choose a model</option>
                {cars ? (cars.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.brand}
                    {' '}
                    {a.model}
                  </option>
                ))) : null}
              </select>
            </div>
          </div>
          <div>
            <div>
              <p>City:</p>
            </div>
            <div id="city_field">
              <PlacesAutocomplete
                value={cityAdd}
                onChange={setCityAdd}
                onSelect={(e) => { handleInputChange('city', e); }}
              >
                {({
                  getInputProps, suggestions, getSuggestionItemProps, loading,
                }) => (
                  <div className="question_frame">
                    <input className="address_text_area" {...getInputProps({ placeholder: 'City' })} />
                    <div>
                      {loading ? <div>...cargando</div> : null}

                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active ? '#FFC107' : '#fff',
                        };
                        return (
                          <div
                            className="suggestion_list"
                            key={miniIdGenerator()}
                            {...getSuggestionItemProps(
                              suggestion,
                              { style },
                            )}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </div>
          <div>
            <div>
              <p>Start Date:</p>
            </div>
            <div id="start_date_field">
              <input type="date" onChange={(e) => { handleInputChange('start_date', e.target.value); }} />
            </div>
          </div>
          <div>
            <div>
              <p>End Date:</p>
            </div>
            <div id="end_date_field">
              <input type="date" onChange={(e) => { handleInputChange('end_date', e.target.value); }} />
            </div>
          </div>
          <div>
            <button type="button" onClick={() => { handleSubmit(); }}>Submit</button>
          </div>
        </form>
      </div>
      <p>
        <small>
          Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo
        </small>
      </p>
    </div>
  );
};

export default NewRental;
