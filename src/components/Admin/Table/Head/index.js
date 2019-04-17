import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends Component {
  handleClick = () => {
    const { onClick, columnPosition } = this.props;
    onClick(columnPosition);
  };

  render() {
    const { children, highlight, clickCounter } = this.props;
    return (
      <th
        onClick={this.handleClick}
        style={
          highlight ? { background: clickCounter % 2 ? '#d61818' : '#347dd6', opacity: 1 } : {}
        }
      >
        <span>{children}</span>
      </th>
    );
  }
}

TableHead.propTypes = {
  onClick: PropTypes.func.isRequired,
  columnPosition: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  highlight: PropTypes.bool.isRequired,
  clickCounter: PropTypes.number.isRequired,
};
