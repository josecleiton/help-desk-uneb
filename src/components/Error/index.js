import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo from '../Logo';

import './style.css';

export default class Error extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  render() {
    const { animate } = this.state;
    const {
      icon, title, children, url,
    } = this.props;
    return (
      <div className="error" style={{ opacity: animate ? 1 : 0 }}>
        <i className={`${icon} fa-10x`} />
        <h1>{title}</h1>
        <p>{children}</p>
        <Link to={url}>
          <Logo width="100" height="50" margin="2% auto" />
        </Link>
      </div>
    );
  }
}

Error.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
