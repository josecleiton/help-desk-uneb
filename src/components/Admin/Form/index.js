import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class AdminForm extends Component {
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
    const { children, handleSubmit } = this.props;
    const { animate } = this.state;
    return (
      <form className="admin" style={{ opacity: animate ? 1 : 0 }} onSubmit={handleSubmit}>
        {children}
      </form>
    );
  }
}

AdminForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
