import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './style.css';

const Card = (props) => {
  const {
    info: { title, subTitle },
    url,
    exact,
    payload,
    location: { pathname: currentPath },
  } = props;
  return (
    <div className="card-shape">
      <div className="card-shape-inner">
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>
      <Link
        to={{ pathname: !exact ? `${url}/${title}` : url, state: { from: currentPath, payload } }}
      >
        mostrar mais
        {' '}
        <i className="fas fa-arrow-circle-right" />
      </Link>
    </div>
  );
};

Card.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
  payload: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  exact: PropTypes.bool,
};

Card.defaultProps = {
  exact: false,
};

export default withRouter(Card);
