import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableRow extends Component {
  constructor() {
    super();
    this.state = {
      cells: [],
    };
  }

  componentDidMount() {
    const { elements } = this.props;
    this.setState({ cells: elements.map(e => <td key={`cell-${e}`}>{e}</td>) });
  }

  render() {
    const { handleClick, link } = this.props;
    const { cells } = this.state;
    return (
      <tr onClick={handleClick} style={{ cursor: link ? 'pointer' : '' }}>
        {cells}
      </tr>
    );
  }
}

TableRow.defaultProps = {
  handleClick: () => {},
  link: false,
};

TableRow.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func,
  link: PropTypes.bool,
};
