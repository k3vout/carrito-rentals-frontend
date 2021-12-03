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
    <div>
      <div>
        <h1>Our Carritos</h1>
        <p>Click on a car to see more details</p>
      </div>
      <div>
        <div>
          {grouper(cars).map((a, index) => (
            <div key={`key${index * 1}`} className="carousel-item active">
              <div className="row">
                {a.map((b) => (
                  <div key={b.id}>
                    <img alt="..." src={b.image} />
                    <h6>{b.model}</h6>
                    <p>..........</p>
                    <p>
                      Transmision:
                      {b.transmision}
                    </p>
                    <p>
                      Mileage:
                      {b.mileage}
                    </p>
                    <p>
                      Seats:
                      {b.seats_number}
                    </p>
                    <div>
                      <span>
                        <img src="facebook.svg" alt="..." />
                      </span>
                      <span>
                        <img src="facebook.svg" alt="..." />
                      </span>
                      <span>
                        <img src="facebook.svg" alt="..." />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-dark rounded"
            aria-hidden="true"
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-dark rounded"
            aria-hidden="true"
          />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
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
