/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/app/app';
import storageAvailable from './utilities/storage';

const DeleteCar = () => {
  const cars = useSelector((data) => data.dataReducer).myCarsList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(actions.triggerMyCarsList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
  }, []);
  const handleDeleteClick = (carId) => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(actions.deleteCar({
          token: JSON.parse(sessionStorage.getItem('prvTkn')),
          id: carId,
        }));
      }
    }
  };
  return (cars
    ? (cars.length > 0 ? (
      <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-gradient custom-bg">
        <div>
          <h1 className="display-3 text-center pt-5">Delete a car</h1>
          <p className="text-center pb-5 px-3">Select the cars you want to remove</p>
        </div>
        <div className="text-center d-flex flex-column mx-auto form-width px-5">
          <ul className="list-group">
            {cars.map((e) => (
              <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center text-start">
                {e.brand}
                {' '}
                {e.model}
                <span className="badge bg-warning rounded-pill ms-5">
                  <button type="button" onClick={() => { handleDeleteClick(e.id); }} className="btn btn-sm btn-link text-dark text-decoration-none ">
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="creators text-muted text-center">
          <small>
            Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo
          </small>
        </p>
      </div>
    ) : (
      <div className="justify-content-center align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-bg text-center">
        <h5 className="display">
          You have no cars created yet.
          <br />
          Go to New Car to create one.
        </h5>
      </div>
    )
    ) : (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  );
};

export default DeleteCar;
