import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
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
    const { setor } = props;
    super(props);
    this.state = {
      modInstall: '',
      redirect: false,
      setor,
    };
  }

  componentDidMount() {
    const { setor } = this.props;
    api
      .post('/api/problema/read', { nomeSetor: setor })
      .then((res) => {
        this.setState({ problema: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ModuleInstall = () => {
    const { modInstall } = this.state;
    if (modInstall === 'modulo') {
      return <FormTi />;
    }
    return null;
  };

  handleChange = (event) => {
    this.setState({ modInstall: event.target.value });
    console.log(event.target.value);
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return null;
  };

  render() {
    const { setor, problema } = this.state;
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
      <Formik
        initialValues={{
          nome: '',
          cpf: '',
          email: '',
          descricao: '',
          ti: 0,
          setor,
          problema: '',
        }}
        validationSchema={Yup.object().shape({
          nome: Yup.string().required('Preencha o campo NOME'),
          problema: Yup.string().required('Selecione o PROBLEMA'),
          cpf: Yup.string()
            .matches(phoneRegExp, 'formato de CPF inválido! Digite apenas NÚMERO')
            .required('Preencha o CPF'),
          telefone: Yup.string()
            .matches(phoneRegExp, 'formato de telefone inválido! Digite apenas NÚMERO')
            .required('Preencha o TELEFONE'),
          email: Yup.string()
            .email('Email inválido')
            .required('Preencha o campo email'),
        })}
        onSubmit={(fields) => {
          this.setState({ modInstall: fields.problema });
          api
            .post('/api/chamado/create', fields)
            .then((res) => {
              alert('CADASTRO REALIZADO COM SUCESSO');
              setTimeout(() => {
                this.setState({ redirect: true });
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
            });
          // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
        }}
        render={() => (
          <div className="form-chamado">
            {this.renderRedirect()}
            <h2>{setor}</h2>
            <Form>
              <div>
                <small>
                  <i className="fas fa-user" />
                  Nome:
                </small>
                <Field type="text" name="nome" style={inputStyle} />
              </div>
              <ErrorMessage
                name="nome"
                component="small"
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              />
              <div>
                <small>
                  <i className="fas fa-user" />
                  CPF:
                </small>
                <Field type="number" name="cpf" style={inputStyle} />
              </div>
              <ErrorMessage
                name="cpf"
                component="small"
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              />
              <div>
                <small>
                  <i className="fas fa-envelope" />
                  Email:
                </small>
                <Field type="email" name="email" style={inputStyle} />
              </div>
              <ErrorMessage
                name="email"
                component="small"
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              />
              <div>
                <small>
                  <i className="fas fa-phone" />
                  Telefone:
                </small>
                <Field type="tel" name="telefone" style={inputStyle} />
              </div>
              <ErrorMessage
                name="telefone"
                component="small"
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              />

              <div>
                <small>
                  <i className="fas fa-bug" />
                  Problema:
                </small>
                <Field component="select" name="problema">
                  <option value="">Selecione o problema</option>
                  <option value="00">problema não listado</option>
                  {problema
                    && problema.map((value, index) => (
                      <option id={index} value={value.id}>
                        {value.descricao}
                      </option>
                    ))}

                  {setor === 'TI' ? <option value="modulo"> Modulo de instalação </option> : null}
                </Field>
              </div>
              <ErrorMessage
                name="problema"
                component="small"
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              />

              <div>
                <small>
                  <i className="fas fa-images" />
                  Imagem do defeito:
                  <Field type="file" name="imagem" />
                  <ErrorMessage name="imagem" component="div" className="invalid-feedback" />
                </small>
              </div>

              {this.ModuleInstall()}
              <div>
                <small>
                  <i className="fas fa-comments" />
                  Descrição:
                </small>
                <Field component="textarea" name="descricao" style={inputStyle} />
              </div>
              <div>
                <Button type="submit" background="blue" width="100%">
                  <i className="fas fa-file-alt" />
                  ABRIR CHAMADO
                </Button>
              </div>
            </Form>
          </div>
        )}
      />
    );
  }
}

AbrirChamadoForm.propTypes = {
  setor: PropTypes.string.isRequired,
};
