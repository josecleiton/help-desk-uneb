import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TableContext from '../Context';

class TableRow extends Component {
  constructor(props) {
    super(props);
    // const { elements } = this.props;
    this.state = {
      animate: false,
    };
    // this.payload = elements.pop();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  handleClick = (url, primaryKey = -1, checkInfo = {}, payload) => {
    const {
      elements,
      history: { push: redirectTo },
      location,
    } = this.props;
    const arrayCheckInfo = Object.keys(checkInfo);
    if (!arrayCheckInfo.length) {
      if (url && primaryKey + 1) {
        redirectTo({
          pathname: `${url}/${elements[primaryKey]}`,
          state: { from: location, payload },
        });
      }
    } else if (url && primaryKey + 1) {
      const column = arrayCheckInfo[0];
      const elementColumn = elements[column];
      if (elementColumn === checkInfo[column][0]) {
        redirectTo({
          pathname: `${checkInfo[column][1]}/${elements[primaryKey]}`,
          state: { from: location, payload },
        });
      } else {
        redirectTo({
          pathname: `${url}/${elements[primaryKey]}`,
          state: { from: location, payload },
        });
      }
    }
  };

  renderElements = () => {
    const result = [];
    const { elements } = this.props;
    for (let i = 0, limit = elements.length - 1; i < limit; i += 1) {
      result.push(<td key={`cell-${elements[i]}`}>{elements[i]}</td>);
    }
    return result;
  };

  render() {
    const { animate } = this.state;
    const { elements } = this.props;
    return (
      <TableContext.Consumer>
        {(state) => {
          const { goToUrl, rowsPrimaryKey, checkInfo } = state;
          const { payload } = this.props;
          const handleClick = () => this.handleClick(goToUrl, rowsPrimaryKey, checkInfo, payload);
          return (
            <tr
              onClick={goToUrl && handleClick}
              style={{ cursor: goToUrl ? 'pointer' : 'regular', opacity: animate ? 1 : 0 }}
              role="button"
            >
              {/* {this.renderElements()} */}
              {elements.map(e => (
                <td key={`cell-${e}`}>{e}</td>
              ))}
            </tr>
          );
        }}
      </TableContext.Consumer>
    );
  }
}

TableRow.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  // payload: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(TableRow);
