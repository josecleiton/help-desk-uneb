import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class AdminRightDiv extends Component {
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
    const { children } = this.props;
    return (
      <div className="admin-right" style={{ opacity: animate ? 1 : 0 }}>
        {children}
      </div>
    );
  }
}

AdminRightDiv.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
};
