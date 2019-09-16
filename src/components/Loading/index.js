import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const Loading = ({ color }) => (
  <center>
    <ReactLoading color={color} height="10%" width="10%" />
  </center>
);

Loading.propTypes = {
  color: PropTypes.string,
};

Loading.defaultProps = {
  color: '#2964AD',
};

export default Loading;
