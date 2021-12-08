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
      <div>
        <div>
          <h1>Delete a car</h1>
          <p>Select the cars you want to remove</p>
        </div>
        <div>
          <ul>
            {cars.map((e) => (
              <li key={e.id}>
                {e.brand}
                {e.model}
                <span>
                  <button type="button" onClick={() => { handleDeleteClick(e.id); }}>
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p>
          <small>
            Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo
          </small>
        </p>
      </div>
    ) : <div>no cars to delete</div>
    ) : null
  );
};

export default DeleteCar;
