import React, { Component } from 'react';
import PropTypes from 'prop-types';

// O estilo desse component se encontra no style.css do AtendimentoForm

export default class AtendimentoOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleClick = (el) => {
    const {
      target: { checked },
    } = el;
    const { handle } = this.props;
    this.setState({ active: checked }, () => {
      handle(checked);
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { children, name, title } = this.props;
    const { active } = this.state;
    return (
      <div className="admin-chamado-input">
        <label htmlFor={`${name}`} role="button">
          {title}
          <input type="checkbox" id={`${name}`} onClick={this.handleClick} />
          <span className="label-checkbox" />
        </label>
        <div id={`admin-chamado-${name}`}>{active && children}</div>
      </div>
    );
  }
}

AtendimentoOption.defaultProps = {
  handle: () => {},
};

AtendimentoOption.propTypes = {
  handle: PropTypes.func,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
