import React, { Component } from 'react';

import TextArea from '../../../../TextArea';

import './style.css';

export default class AtendimentoTombamento extends Component {
  constructor(props) {
    super(props);
    this.state = { animate: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  render() {
    const { animate } = this.state;
    return (
      <div className="atendimento-tombamento" style={{ opacity: animate ? 1 : 0 }}>
        <TextArea
          placeholder="Informações adicionais sobre o tombamento."
          style={{ width: '100%', marginBottom: '10px' }}
          required
        />
      </div>
    );
  }
}
