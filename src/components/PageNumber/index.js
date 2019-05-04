import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class PageNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: null,
      page: null,
    };
  }

  componentDidMount() {
    this.makePageNumber();
  }

  handleClick = (element) => {
    const { handleClick } = this.props;
    const { page } = this.state;
    const number = element.target.innerHTML;
    if (page !== number) {
      handleClick(number);
      this.setState({ page: number });
    }
  };

  makePageNumber = () => {
    const { elementsPerPage } = this.props;
    const numbers = [];
    for (let i = 1; i <= elementsPerPage; i += 1) {
      numbers.push(
        <li key={i}>
          <button type="button" id="page-number" onClick={this.handleClick}>
            {i}
          </button>
        </li>,
      );
    }

    this.setState({ numbers });
  };

  render() {
    const { numbers } = this.state;
    return (
      <div className="page-number">
        <ul>{numbers}</ul>
      </div>
    );
  }
}

PageNumber.propTypes = {
  elementsPerPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
