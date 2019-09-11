import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

// import isAuth from '../../../components/Admin/Auth';
import AdminContext from '../../../components/Admin/Context';

const PrivateRouteAdmin = ({ component: Component, cargo, ...rest }) => (
  <AdminContext.Consumer>
    {(state) => {
      const { user } = state;
      return (
        <Route
          {...rest}
          render={
            props => (user.cargo === 'A' || user.cargo === cargo
              ? (<Component {...props} />)
              : (<Redirect to={{ pathname: '/admin', state: { from: props.location, user } }} />))
          }
        />
      );
    }}
  </AdminContext.Consumer>
);

PrivateRouteAdmin.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  cargo: PropTypes.string.isRequired,
};

export default PrivateRouteAdmin;
