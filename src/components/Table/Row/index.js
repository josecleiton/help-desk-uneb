import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class TableRow extends Component {
  constructor(props) {
    super(props);
    const { elements, url } = props;
    this.state = {
      animate: false,
      hasLink: url.length !== 0,
    };
    this.cells = elements.map(e => <td key={`cell-${e}`}>{e}</td>);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  handleClick = () => {
    const {
      url,
      primaryKey,
      elements,
      history: { push: redirectTo },
    } = this.props;
    if (url && primaryKey + 1) redirectTo(`${url}/${elements[primaryKey]}`);
  };

  render() {
    const { animate, hasLink } = this.state;
    return (
      <tr
        onClick={this.handleClick}
        style={{ cursor: hasLink ? 'pointer' : 'regular', opacity: animate ? 1 : 0 }}
      >
        {this.cells}
      </tr>
    );
  }
}

TableRow.defaultProps = {
  primaryKey: -1,
  url: '',
};

TableRow.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryKey: PropTypes.number,
  url: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(TableRow);
