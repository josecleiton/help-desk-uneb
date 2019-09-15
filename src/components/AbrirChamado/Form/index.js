import React from 'react';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import Input from '../../Input';
import Button from '../../Button';
import FormTi from '../FormTi';
import './style.css';
import ErrorAlert from '../../ErrorAlert';

const inputStyle = {
  padding: '10px',
  fontSize: '12px',
};

export default class AbrirChamadoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modInstall: '',
      error: {},
      file: null,
      success: null,
      sent: false,
    };
  }

  handleChange = (event) => {
    this.setState({ modInstall: event.target.value });
  };

  handleFileUpload = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = Object();
    const { setor } = this.props;
    let validateCursor = 0;
    // const requestBody = {};
    let accepted = true;
    // console.log('SUBMITADO!');
    // console.log(e);
    const inputEl = document.querySelectorAll('input');
    const textArea = document.querySelector('textarea');
    const nomeReg = /^.*[0-9].*$/;
    if (nomeReg.test(inputEl[validateCursor].value)) {
      error[validateCursor] = 'Nome não deve conter números';
      accepted = false;
    }
    validateCursor = 1;
    const cpfReg = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;
    if (!cpfReg.test(inputEl[validateCursor].value)) {
      error[validateCursor] = 'CPF Incorreto';
      accepted = false;
    }
    // const telReg = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
    // if (!telReg.test(inputEl[validateCursor].value)) {
    //   error[validateCursor] = 'Telefone deve ser (xx) xxxx-xxxx';
    //   accepted = false;
    // }
    const telReg = /^[0-9]*$/;
    validateCursor = 3;
    const telefone = inputEl[validateCursor].value;
    // console.log(telReg.test(telefone));
    if (!telReg.test(telefone) || (telefone.length !== 11 && telefone.length !== 10)) {
      error[validateCursor] = 'Celular é formado por 11 números, fixo por 10 números: DDXXXXXXXX';
      accepted = false;
    }
    if (textArea.value.length > 1024) {
      error[5] = 'Mais do que 1000 caracteres na descrição do chamado';
      accepted = false;
    }
    const selectEl = document.querySelector('select');
    // console.log(selectEl);
    const problema = selectEl.options[selectEl.selectedIndex];
    // const problema = selectEl.option[selectEl.selectedIndex];

    console.log(problema);
    if (accepted) {
      const fd = new FormData();
      const { file } = this.state;
      if (file) {
        fd.append('arquivo', file, file.name);
      }
      fd.append('nome', inputEl[0].value);
      fd.append('cpf', inputEl[1].value);
      fd.append('email', inputEl[2].value);
      fd.append('telefone', telefone);
      fd.append('setor_nome', setor);
      fd.append('descricao', textArea.value);
      if (problema.value >= 0) {
        fd.append('problema', problema.innerHTML);
      }

      // requestBody.nome = inputEl[0].value;
      // requestBody.cpf = inputEl[1].value;
      // requestBody.email = inputEl[2].value;
      // requestBody.telefone = telefone;
      // requestBody.setor_nome = setor;
      // requestBody.descricao = textArea.value;
      // console.log(file);
      // requestBody.arquivo = file;
      // this.setState({ error });
      api
        .post('/api/chamado/create.php', fd, {
          onUploadProgress: (progressEvent) => {
            this.setState({
              uploadStatus: `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`,
            });
          },
        })
        .then((res) => {
          if (!res.data.error) {
            const {
              history: { push: redirectTo },
            } = this.props;
            this.setState({ error: {}, success: 'Chamado criado!', sent: true }, () => {
              setTimeout(() => {
                redirectTo('/');
              }, 2000);
            });
          } else {
            this.setState({ error: { msg: res.data.mensagem } });
          }
        })
        .catch(() => {
          this.setState({ error: { mensagem: 'Deu ruim no server' } });
        });
    } else {
      this.setState({ error });
    }
  };

  ModuleInstall = () => {
    const { modInstall } = this.state;
    if (modInstall === 'modulo') {
      return <FormTi />;
    }
    return null;
  };

  render() {
    const { setor, problemas } = this.props;
    const {
      error, success, uploadStatus, sent,
    } = this.state;
    const errorsAlert = Object.keys(error).map(el => (
      <ErrorAlert key={error[el]}>{error[el]}</ErrorAlert>
    ));
    return (
      <>
        <div className="form-chamado">
          <h2>{setor}</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <small>
                <i className="fas fa-user" />
                Nome:
              </small>
              <Input type="text" style={inputStyle} required />
            </div>
            <div>
              <small>
                <i className="fas fa-lock" />
                CPF:
              </small>
              <Input type="text" style={inputStyle} required />
            </div>
            <div>
              <small>
                <i className="fas fa-envelope" />
                Email:
              </small>
              <Input type="email" style={inputStyle} required />
            </div>
            <div>
              <small>
                <i className="fas fa-phone" />
                Telefone:
              </small>
              <Input type="tel" style={inputStyle} required />
            </div>
            <div>
              <small>
                <i className="fas fa-bug" />
                Problema:
              </small>
              <select id="problema" onChange={this.handleChange}>
                <option value="-1">informe o problema</option>
                {/* <option value="01">problema 1</option>
              <option value="02">problema 2</option> */}
                {problemas.map((p, idx) => (
                  <option value={idx} key={p.descricao}>
                    {p.descricao}
                  </option>
                ))}
                {setor === 'TI' ? <option value="modulo"> Modulo de instalação </option> : null}
              </select>
              <small>
                <i className="fas fa-images" />
                Imagem do defeito:
              </small>
              <input type="file" accept="image/*" onChange={this.handleFileUpload} />
              <small style={{ font: 'mono' }}>{uploadStatus}</small>
            </div>
            {this.ModuleInstall()}
            <div>
              <small>
                <i className="fas fa-comments" />
                descrição
              </small>
              <textarea cols="30" rows="10" required />
            </div>
            {/* <Button type="button" background="orange" width="100%" name="retornar">
              <i className="fas fa-exchange-alt" />
              MUDAR SETOR
            </Button> */}
            {!sent ? (
              <Button type="submit" background="blue" width="100%">
                <i className="fas fa-file-alt" />
                ABRIR CHAMADO
              </Button>
            ) : null}
          </form>
        </div>
        {success ? <ErrorAlert className="success">{success}</ErrorAlert> : null}
        {errorsAlert}
      </>
    );
  }
}

AbrirChamadoForm.propTypes = {
  setor: PropTypes.string.isRequired,
  problemas: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
