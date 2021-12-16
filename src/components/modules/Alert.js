import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => (
  <p className="creators text-muted text-center">
    <small>
      {message}
    </small>
  </p>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
