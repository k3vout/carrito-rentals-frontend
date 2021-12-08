/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { triggerRentalsList } from '../redux/app/app';
import storageAvailable from './utilities/storage';

const MyRentals = () => {
  const dispatch = useDispatch();
  const rentals = useSelector((data) => data.dataReducer).rentalList;
  useEffect(() => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(triggerRentalsList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
  }, []);
  return (rentals
    ? (rentals.length > 0 ? (rentals.map((e) => (
      <div key={e.id}>
        {e.start_date}
        {e.end_date}
        {e.city}
        {e.user_id}
        {e.car_id}
      </div>
    ))) : <div>no rentals</div>
    ) : null
  );
};

export default MyRentals;
