import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../Input';
import Button from '../../Button';
import FormTi from '../FormTi';
import api from '../../../services/api';
import './style.css';

const inputStyle = {
  padding: '10px',
  fontSize: '12px',
};

export default class AbrirChamadoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modInstall: '',
      nome: '',
      email: '',
      telefone: '',
      problema: '',
      imagem: '',
      descricao: '',
      setor: '',
    };
  }

  componentDidMount() {
    api
      .post('/api/chamado/create')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick = () => {
    const { setor } = this.props;
    this.setState({
      nome: document.getElementById('nome').value,
      email: '',
      telefone: '',
      problema: '',
      imagem: '',
      descricao: '',
      setor,
    });
  };

  handleChange = (event) => {
    this.setState({ modInstall: event.target.value });
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
    const {
      nome, email, telefone, descricao,
    } = this.state;
    return (
      <div className="form-chamado">
        <h2>{setor}</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <small>
              <i className="fas fa-user" />
              Nome:
            </small>
            <Input type="text" id="nome" value={nome} style={inputStyle} />
          </div>
          <div>
            <small>
              <i className="fas fa-envelope" />
              Email:
            </small>
            <Input type="email" id="email" value={email} style={inputStyle} />
          </div>
          <div>
            <small>
              <i className="fas fa-phone" />
              Telefone:
            </small>
            <Input type="tel" id="tel" value={telefone} style={inputStyle} />
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
            <textarea cols="30" rows="10" id="nome" value={descricao} />
          </div>
          <Button type="submit" background="orange" width="100%" name="retornar">
            <i className="fas fa-exchange-alt" />
            MUDAR SETOR
          </Button>
          <Button type="submit" background="blue" width="100%" onClick={this.handleClick}>
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
