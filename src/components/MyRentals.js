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
      <div>
        <div>
          {rentals.map((e) => (
            <div key={e.id}>
              <img src={getCarInfo(e.car_id, 'image')} className="card-img-top" alt="..." />
              <div>
                <h5>
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
    ) : <div>no rentals</div>
    ) : null
  );
};

export default MyRentals;
