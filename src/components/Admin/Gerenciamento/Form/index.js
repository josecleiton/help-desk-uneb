import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import propTypes from 'prop-types';
import Button from '../../../Button';
import api from '../../../../services/api';
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
    const {
      buttonChildren,
      inputForm,
      handleClick,
      selectForm,
      valueURl,
      widthButton,
      ButtonText,
      url,
    } = this.props;
    const { novaArea } = this.state;

    return (
      <Formik
        initialValues={{
          id_chamado: valueURl,
        }}
        onSubmit={(fields) => {
          console.log(fields);
          api
            .post(`/api/${url}`, fields, {})
            .then((res) => {
              handleClick(res.data);
              // this.setState({ chamado: res.data });
            })
            .catch(() => {
              handleClick(null);
              // this.setState({ chamado: null });
            });
        }}
        render={() => (
          <div className="admin-gerenciamento-form">
            <button type="button" onClick={this.handleNovaArea}>
              {buttonChildren[novaArea]}
            </button>

            {novaArea ? (
              <Form>
                {inputForm
                  ? inputForm.map(inputs => (
                    <div>
                      <strong>{inputs.label}</strong>
                      <Field
                        required
                        key={inputs.id}
                        type={inputs.tipo}
                        name={inputs.nome}
                        placeholder={inputs.placeholder}
                        style={inputStyle}
                      />
                    </div>
                  ))
                  : null}
                {selectForm
                  ? selectForm.map(select => (
                    <div>
                      <strong>{select.label}</strong>
                      <Field component="select" name={select.nome} key={select.id}>
                        {select.option.map(options => (
                          <option value={options.value}>{options.nome}</option>
                        ))}
                      </Field>
                    </div>
                  ))
                  : null}
                <div style={{ display: 'flex' }}>
                  <Button type="submit" background="blue" width={widthButton}>
                    <i className="fas fa-file-alt" />
                    {ButtonText}
                  </Button>
                </div>
              </Form>
            ) : null}
          </div>
        )}
      />
    );
  }
}
AdminGerenciamentoForm.defaultProps = {
  widthButton: '100%',
  valueURl: null,
};
AdminGerenciamentoForm.propTypes = {
  handleClick: propTypes.func.isRequired,
  url: propTypes.string.isRequired,
  ButtonText: propTypes.string.isRequired,
  buttonChildren: propTypes.arrayOf(propTypes.any).isRequired,
  inputForm: propTypes.arrayOf(propTypes.any).isRequired,
  selectForm: propTypes.arrayOf(propTypes.any).isRequired,
};
