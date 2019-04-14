import React, { Component } from 'react';
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
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return (
      <div className="admin-right" style={{ opacity: animate ? 1 : 0 }}>
        {children}
      </div>
    );
  }
}
