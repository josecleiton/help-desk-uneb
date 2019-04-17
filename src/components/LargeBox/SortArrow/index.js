import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class SortArrow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toRender: <i className="fas fa-sort-down fa-2x" role="link" />,
    };
    this.clicked = true;
  }

  handleClick = () => {
    this.clicked = !this.clicked;
    const { slide } = this.props;
    if (this.clicked) {
      this.setState(
        {
          toRender: <i className="fas fa-sort-down fa-2x" role="link" />,
        },
        () => {
          slide(this.clicked);
        },
      );
    } else {
      this.setState(
        {
          toRender: <i className="fas fa-sort-down fa-2x fa-rotate-180" role="link" />,
        },
        () => {
          slide(this.clicked);
        },
      );
    }
  };

  render() {
    const { toRender } = this.state;
    return (
      <div role="presentation" onClick={this.handleClick}>
        {toRender}
      </div>
    );
  }
}

SortArrow.propTypes = {
  slide: PropTypes.func.isRequired,
};
