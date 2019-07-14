import React, { Component } from 'react';
import propTypes from 'prop-types';
import AdminForm from '../../Form';
import Input from '../../../Input';
import './style.css';

const inputStyle = {
  padding: '5px',
  border: '1px solid rgba(0,0,0,0.3)',
  display: 'block',
  margin: '10px auto',
  width: '95%',
};
export default class AdminGerenciamentoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novaArea: 0,
    };
  }

  handleNovaArea = () => {
    const { novaArea } = this.state;
    this.setState({ novaArea: (novaArea + 1) % 2 });
  };

  render() {
    const { buttonChildren, handleSubmit } = this.props;
    const { novaArea } = this.state;
    return (
      <div className="admin-gerenciamento-form">
        <button type="button" onClick={this.handleNovaArea}>
          {buttonChildren[novaArea]}
        </button>
        {novaArea ? (
          <AdminForm handleSubmit={handleSubmit}>
            <Input type="text" placeholder="Nome" style={inputStyle} />
            <Input type="text" placeholder="Nome" style={inputStyle} />
            <Input type="text" placeholder="Nome" style={inputStyle} />
            <Input type="text" placeholder="Nome" style={inputStyle} />
            <button type="submit" id="submit">
              Enviar
            </button>
          </AdminForm>
        ) : null}
      </div>
    );
  }
}

AdminGerenciamentoForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  buttonChildren: propTypes.arrayOf(propTypes.any).isRequired,
};
