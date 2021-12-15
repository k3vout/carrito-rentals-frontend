import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { actions } from '../redux/app/app';

const SingleCar = () => {
  const history = useHistory();
  const data = useSelector((data) => data.dataReducer).singleCar;
  const dispatch = useDispatch();
  const handleRentThisCar = (carid, carname) => {
    dispatch(actions.setCarToRent({ id: carid, name: carname }));
    const path = '/newrent';
    history.push(path);
  };
  return (data
    ? (
      <div className="justify-content-between align-content-center d-flex flex-column pt-5 vh-100 w-100 bg-transparent custom-gradient">
        <div className="justify-content-lg-end justify-content-center d-flex vh-100 w-100 flex-wrap">
          <div className="d-flex text-center align-items-center justify-content-center">
            <img
              src={data.image}
              id="slide"
              className="img-fluid car-big-pic"
              alt="..."
            />
          </div>
          <div className="p-5">
            <h2 className="align-self-end pt-5 text-end m-0">{`${data.brand} ${data.model}`}</h2>
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
                  <tr>
                    <th className="text-muted">Price:</th>
                    <td className="text-muted">
                      US$
                      {' '}
                      {data.price_for_day}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="w-auto text-center">
              <button type="button" className="rounded-pill bg-warning text-dark fw-bold py-2 px-4 mt-5 ms-auto border-0 shadow" onClick={() => { handleRentThisCar(data.id, `${data.brand} ${data.model}`); }}>Rent this car</button>
            </div>
          </div>
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
