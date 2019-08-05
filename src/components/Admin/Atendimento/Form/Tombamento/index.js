import React, { Component } from 'react';

import TextArea from '../../../../TextArea';
import Input from '../../../../Input';

import './style.css';

const inputStyle = {
  border: '1px solid rgba(0,0,0,0.4)',
  margin: '10px auto',
  padding: '3px',
  fontSize: '14px',
};

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
        <Input placeholder="Código do Tombo" style={inputStyle} />
        <TextArea
          placeholder="Informações adicionais sobre o tombamento."
          style={{ width: '100%', marginBottom: '10px' }}
          required
        />
      </div>
    );
  }
}
