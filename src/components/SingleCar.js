import React from 'react';
import { useSelector } from 'react-redux';

const SingleCar = () => {
  const data = useSelector((data) => data.dataReducer).singleCar;
  return (data
    ? (
      <div>
        <div>
          <h2>{data.model}</h2>
          <p>..........</p>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Transmision: </th>
                  <td>{data.transmision}</td>
                </tr>
                <tr>
                  <th>Mileage: </th>
                  <td>{data.mileage}</td>
                </tr>
                <tr>
                  <th>Seats:</th>
                  <td>{data.seats_number}</td>
                </tr>
                <tr>
                  <th>Storage:</th>
                  <td>
                    {data.bags_number}
                    {' bags'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <img
            src="carbig.png"
            id="slide"
            className="img-fluid car-big-pic"
            alt="..."
          />
        </div>
        <div className="align-self-bottom mx-5">
          <h5 className="text-center">Book now, pay later</h5>
          <p className="text-center pb-4">
            <small>
              Lock in a great deal today, then pay when you collect the
              car.
            </small>
          </p>
        </div>
        <p className="creators text-muted text-center">
          <small>
            Created By @sevinchek @hunter4466 @the-catalystmc @smunozmo
          </small>
        </p>
      </div>
    ) : false
  );
};

export default SingleCar;
