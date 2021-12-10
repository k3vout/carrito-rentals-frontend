import React from 'react';

const SignUp = () => (
  <div className="align-self-center">
    <p className="creators text-muted text-center">
      <small>
        Please create a new username:
      </small>
    </p>
    <div className="input-group mb-5 align-self-center username">
      <span className="input-group-text">New</span>
      <input type="text" placeholder="Username" className="form-control" />
    </div>
  </div>
);

export default SignUp;
