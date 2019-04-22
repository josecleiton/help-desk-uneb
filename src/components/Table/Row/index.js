import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class TableRow extends Component {
  constructor(props) {
    super(props);
    const { url } = props;
    this.state = {
      animate: false,
      hasLink: url.length !== 0,
    };
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
      location,
      checkInfo,
    } = this.props;
    const arrayCheckInfo = Object.keys(checkInfo);
    if (!arrayCheckInfo.length) {
      if (url && primaryKey + 1) {
        redirectTo({
          pathname: `${url}/${elements[primaryKey]}`,
          state: { from: location.pathname },
        });
      }
    } else if (url && primaryKey + 1) {
      const column = arrayCheckInfo[0];
      const elementColumn = elements[column];
      if (elementColumn === checkInfo[column][0]) {
        redirectTo({
          pathname: `${checkInfo[column][1]}/${elements[primaryKey]}`,
          state: { from: location.pathname },
        });
      } else {
        redirectTo({
          pathname: `${url}/${elements[primaryKey]}`,
          state: { from: location.pathname },
        });
      }
    }
  };

  render() {
    const { animate, hasLink } = this.state;
    const { elements } = this.props;
    return (
      <Fragment>
        <tr
          onClick={this.handleClick}
          style={{ cursor: hasLink ? 'pointer' : 'regular', opacity: animate ? 1 : 0 }}
          role="button"
        >
          {elements.map(e => (
            <td key={`cell-${e}`}>{e}</td>
          ))}
        </tr>
      </Fragment>
    );
  }
}

TableRow.defaultProps = {
  primaryKey: -1,
  checkInfo: {},
  url: '',
};

TableRow.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryKey: PropTypes.number,
  checkInfo: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  url: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(TableRow);
