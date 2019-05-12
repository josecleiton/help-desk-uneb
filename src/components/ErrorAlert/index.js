import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class ErrorAlert extends Component {
  constructor(props) {
    super(props);
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
    const { children, className } = this.props;
    const { animate } = this.state;
    return (
      <div className={`error-alert ${className}`} style={{ opacity: animate ? 1 : 0 }}>
        {children}
      </div>
    );
  }
}

ErrorAlert.defaultProps = {
  className: '',
};

ErrorAlert.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};
