import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../Input';
import Button from '../../Button';
import FormTi from '../FormTi';
import './style.css';

const inputStyle = {
  padding: '10px',
  fontSize: '12px',
};

export default class AbrirChamadoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modInstall: '' };
  }

  handleChange = (event) => {
    this.setState({ modInstall: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMITADO!');
    console.log(e);
  };

  handleNomeChange = (ele) => {
    console.log('INPUUUUT');
  };

  ModuleInstall = () => {
    const { modInstall } = this.state;
    if (modInstall === 'modulo') {
      return <FormTi />;
    }
    return null;
  };

  render() {
    const { setor } = this.props;
    return (
      <div className="form-chamado">
        <h2>{setor}</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <small>
              <i className="fas fa-user" />
              Nome:
            </small>
            <Input type="text" style={inputStyle} submitHandler={this.handleNomeChange} />
          </div>
          <div>
            <small>
              <i className="fas fa-envelope" />
              Email:
            </small>
            <Input type="email" style={inputStyle} />
          </div>
          <div>
            <small>
              <i className="fas fa-phone" />
              Telefone:
            </small>
            <Input type="tel" style={inputStyle} />
          </div>
          <div>
            <small>
              <i className="fas fa-bug" />
              Problema:
            </small>
            <select id="problema" onChange={this.handleChange}>
              <option value="">informe o problema</option>
              <option value="01">problema 1</option>
              <option value="02">problema 2</option>
              {setor === 'TI' ? <option value="modulo"> Modulo de instalação </option> : null}
            </select>
            <small>
              <i className="fas fa-images" />
              Imagem do defeito:
            </small>
            <input type="file" />
          </div>
          {this.ModuleInstall()}
          <div>
            <small>
              <i className="fas fa-comments" />
              descrição
            </small>
            <textarea cols="30" rows="10" />
          </div>
          <Button background="orange" width="100%" name="retornar">
            <i className="fas fa-exchange-alt" />
            MUDAR SETOR
          </Button>
          <Button type="submit" background="blue" width="100%">
            <i className="fas fa-file-alt" />
            ABRIR CHAMADO
          </Button>
        </form>
      </div>
    );
  }
}

AbrirChamadoForm.propTypes = {
  setor: PropTypes.string.isRequired,
};
