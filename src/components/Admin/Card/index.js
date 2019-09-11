import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './style.css';

const Card = (props) => {
  const {
    info: { title, chamados },
    url,
    location: { pathname: currentPath },
  } = props;
  return (
    <div className="card-shape">
      <div className="card-shape-inner">
        <div>{title}</div>
        <div>{chamados}</div>
      </div>
      <Link to={{ pathname: `${url}/${title}`, state: { from: currentPath } }}>
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
    chamados: PropTypes.string.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Card);
