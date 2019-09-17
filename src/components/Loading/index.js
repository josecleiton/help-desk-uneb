import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const Loading = ({ color, size }) => (
  <center>
    <ReactLoading color={color} height={size} width={size} />
  </center>
);

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

Loading.defaultProps = {
  color: '#2964AD',
  size: '10%',
};

export default Loading;
