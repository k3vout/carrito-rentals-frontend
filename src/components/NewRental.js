/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PlacesAutocomplete, {
} from 'react-places-autocomplete';
import { actions } from '../redux/app/app';
import { miniIdGenerator } from './utilities/idgen';
import storageAvailable from './utilities/storage';

const NewRental = () => {
  const cars = useSelector((data) => data.dataReducer).allCars;
  const carToR = useSelector((data) => data.dataReducer).carToRent;
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
        dispatch(actions.triggerCarList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
    if (carToR) {
      handleInputChange('car_id', carToR.id);
    }
    return () => {
      dispatch(actions.setCarToRent(false));
    };
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
          dispatch(actions.checkToken(JSON.parse(sessionStorage.getItem('prvTkn'))));
          const path = '/myrentals';
          history.push(path);
          dispatch(actions.addNewRent(newObj));
        } else {
          dispatch(actions.setUserLoggedState(false));
          dispatch(actions.displayAlert('Please log in to continue'));
        }
      }
    }
  };
  return (
    <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-gradient custom-bg">
      <div>
        <h1 className="display-3 text-center pt-5">New rental</h1>
        <p className="text-center pb-5 px-3">
          Schedule your carrito
        </p>
      </div>
      <div className="text-center d-flex flex-column mx-auto form-width px-5">
        <div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Car:
              </div>
            </div>
            <div className="col-auto" id="car_id_field">
              {carToR ? <input className="form-control" type="text" placeholder={carToR.name} disabled />
                : (
                  <select onChange={(e) => { handleInputChange('car_id', e.target.value); }} className="form-select form-control">
                    <option selected disabled>Choose a model &nbsp; &nbsp; &nbsp;</option>
                    {cars ? (cars.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.brand}
                        {' '}
                        {a.model}
                      </option>
                    ))) : null}
                  </select>
                )}
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                Start Date:
              </div>
            </div>
            <div className="col-auto" id="start_date_field">
              <input
                type="date"
                onChange={(e) => { handleInputChange('start_date', e.target.value); }}
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                End Date:
              </div>
            </div>
            <div className="col-auto" id="end_date_field">
              <input
                type="date"
                onChange={(e) => { handleInputChange('end_date', e.target.value); }}
                className="form-control"
              />
            </div>
          </div>
          <div className="row g-3 justify-content-between py-1">
            <div className="col-auto">
              <div className="col-form-label fw-bold">
                City:
              </div>
            </div>
            <div className="col-auto" id="city_field">
              <PlacesAutocomplete
                value={cityAdd}
                onChange={setCityAdd}
                onSelect={(e) => { handleInputChange('city', e); }}
              >
                {({
                  getInputProps, suggestions, getSuggestionItemProps, loading,
                }) => (
                  <div className="question_frame">
                    <input className="address_text_area form-control" {...getInputProps({ placeholder: 'City' })} />
                    <div className="rounded-bottom shadow m-0 overflow-hidden">
                      {loading ? <div>...loading</div> : null}
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active ? '#FFC107' : '#fff',
                        };
                        return (
                          <div
                            className="suggestion_list py-2 border border-1"
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
        <small>
          Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo
        </small>
      </p>
    </div>
  );
};

export default NewRental;
