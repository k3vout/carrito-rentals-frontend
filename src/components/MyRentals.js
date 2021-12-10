/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../redux/app/app';
import storageAvailable from './utilities/storage';

const MyRentals = () => {
  const dispatch = useDispatch();
  const rentals = useSelector((data) => data.dataReducer).rentalList;
  const cars = useSelector((data) => data.dataReducer).allCars;
  useEffect(() => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        const token = JSON.parse(sessionStorage.getItem('prvTkn'));
        dispatch(actions.triggerRentalsList(token));
        dispatch(actions.triggerCarList(token));
      }
    }
  }, []);
  const getCarInfo = (cid, type) => {
    let value = '';
    cars.forEach((e) => {
      if (e.id === cid) {
        console.log(e[type]);
        value = e[type];
      }
    });
    return value;
  };
  return (rentals
    ? (rentals.length > 0 ? (
      <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-bg">
        <div className="d-flex flex-wrap w-75 mx-auto overflow-scroll justify-content-center custom-position mb-3">
          {rentals.map((e) => (
            <div className="card border border-warning rounded-0 border-1 shadow-lg rental" key={e.id}>
              <img src={getCarInfo(e.car_id, 'image')} className="card-img-top" alt="..." />
              <div className="card-body bg-dark text-center">
                <h5 className="card-title text-warning py-2">
                  {getCarInfo(e.car_id, 'brand')}
                  {getCarInfo(e.car_id, 'model')}
                </h5>
                <p className="card-text text-muted m-0">{e.start_date}</p>
                <p className="card-text text-muted pb-3">
                  US$
                  {getCarInfo(e.car_id, 'price_for_day')}
                </p>
              </div>
            </div>
          ))}
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
          You have no rentals created yet.
          <br />
          Go to New Rental to create one.
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

export default MyRentals;
