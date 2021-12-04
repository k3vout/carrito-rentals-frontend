import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const SingleCar = () => {
  const data = useSelector((data) => data.dataReducer).singleCar;
  return (data
    ? (
      <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-gradient">
        <div className="p-5">
          <h2 className="align-self-end pt-5 text-end m-0">{data.model}</h2>
          <p className="text-muted text-end">..........</p>
          <div className="d-flex">
            <Table className="table w-auto ms-auto table-borderless">
              <tbody>
                <tr>
                  <th className="text-muted">Transmision: </th>
                  <td className="text-muted">{data.transmision}</td>
                </tr>
                <tr className="table-light">
                  <th className="text-muted">Mileage: </th>
                  <td className="text-muted">{data.mileage}</td>
                </tr>
                <tr>
                  <th className="text-muted">Seats:</th>
                  <td className="text-muted">{data.seats_number}</td>
                </tr>
                <tr className="table-light">
                  <th className="text-muted">Storage:</th>
                  <td className="text-muted">
                    {data.bags_number}
                    {' bags'}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="text-center">
          <img
            src={data.image}
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
