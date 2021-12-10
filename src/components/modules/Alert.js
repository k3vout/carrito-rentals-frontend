import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => (
  <div>
    <p className="creators text-muted text-center">
      <small>
        {message}
      </small>
    </p>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
