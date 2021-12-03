import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { triggerCarList } from '../redux/app/app';
import storageAvailable from './utilities/storage';

const Cars = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const dispatch = useDispatch();
  const cars = useSelector((data) => data.dataReducer).allCars;
  useEffect(() => {
    if (storageAvailable('sessionStorage')) {
      if (sessionStorage.getItem('prvTkn')) {
        dispatch(triggerCarList(JSON.parse(sessionStorage.getItem('prvTkn'))));
      }
    }
  }, []);
  const grouper = (data) => {
    const array = [];
    let count = 0;
    let innerArray = [];
    data.forEach((e) => {
      if (count === 3) {
        count = 0;
        array.push(innerArray);
        innerArray = [];
      }
      innerArray.push(e);
      count += 1;
    });
    if (innerArray.length > 0) {
      array.push(innerArray);
    }
    return (array);
  };
  return (cars ? (
    <div className="pt-5 vh-100 custom-gradient justify-content-between align-content-center d-flex flex-column overflow-scroll w-100">
      <div>
        <h1 className="display-3 text-center pt-5">Our Carritos</h1>
        <p className="text-center pb-5">Click on a car to see more details</p>
      </div>
      <Carousel className="carousel-dark slide align-self-center custom-carousel" activeIndex={index} onSelect={handleSelect}>
        {grouper(cars).map((a, index) => (
          <Carousel.Item key={`key${index * 1}`} className="pt-5">
            <div className="row">
              {a.map((b) => (
                <div className="col-sm-4 text-center" key={b.id}>
                  <img alt="..." src={b.image} className="d-block w-100 mx-5" />
                  <h6 className="pt-5">{b.model}</h6>
                  <p className="text-muted">..........</p>
                  <p className="text-muted m-0">
                    Transmision:
                    {b.transmision}
                  </p>
                  <p className="text-muted m-0">
                    Mileage:
                    {b.mileage}
                  </p>
                  <p className="text-muted m-0">
                    Seats:
                    {b.seats_number}
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <span>
                      <img src="facebook.svg" className="social-icon" alt="..." />
                    </span>
                    <span>
                      <img src="facebook.svg" className="social-icon" alt="..." />
                    </span>
                    <span>
                      <img src="facebook.svg" className="social-icon" alt="..." />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="align-self-bottom mx-5">
        <h5 className="text-center pt-4">Drive safe</h5>
        <p className="text-center pb-4">
          <small>
            All cars are protected with our 360 Carrito Insurance.
          </small
        >
        </p>
      </div>
      <p className="creators text-muted text-center">
        <small>
          Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo
        </small>
      </p>
    </div>
  ) : <div> Cars could not be loaded</div>
  );
};

export default Cars;
