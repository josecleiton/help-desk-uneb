import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import isAuth from '../../components/Admin/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (isAuth() ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />))
    }
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default PrivateRoute;
