import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => (
  <div>
    {message}
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
