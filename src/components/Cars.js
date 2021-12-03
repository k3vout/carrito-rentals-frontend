import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerCarList } from '../redux/app/app';
import storageAvailable from './utilities/storage';

const Cars = () => {
  const dispatch = useDispatch();
  const cars = useSelector((data) => data.dataReducer).allCars;
  useEffect(() => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(triggerCarList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
  }, []);
  return (
    <div>
      {cars ? (
        <div>
          {cars.map((a) => (
            <div key={a.id}>{a.id}</div>
          ))}
        </div>
      ) : false}
    </div>
  );
};

export default Cars;
