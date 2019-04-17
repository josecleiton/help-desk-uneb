import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import MainHeader from '../../components/Main/Header';
import MenuChamado from '../../components/Main/MenuChamado';
import BuscarChamado from '../../components/Main/BuscarChamado';
import CriarChamado from '../../components/Main/AreaAtendimento';
import Footer from '../../components/Footer';

import './style.css';
import logo from '../../assets/logo.png';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buscar: '',
    };
  }

  componentDidMount() {
    this.botoesEl = document.getElementById('area-busca');
    ReactDOM.render(<MenuChamado escListener={this.escListener} />, this.botoesEl);
  }

  componentDidUpdate() {
    const { buscar } = this.state;
    const {
      history: { push },
    } = this.props;
    switch (buscar) {
      case 'Esc':
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        setTimeout(() => {
          ReactDOM.render(<MenuChamado escListener={this.escListener} />, this.botoesEl);
        }, 10);
        break;

      case 'Buscar':
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        setTimeout(() => {
          ReactDOM.render(
            <BuscarChamado escListener={this.escListener} redirect={push} />,
            this.botoesEl,
          );
        }, 10);
        break;

      case 'Criar':
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        setTimeout(() => {
          ReactDOM.render(
            <CriarChamado escListener={this.escListener} redirect={push} />,
            this.botoesEl,
          );
        }, 10);
        break;

      default:
        break;
    }
  }

  escListener = (esc) => {
    this.setState({ buscar: esc });
  };

  render() {
    return (
      <div id="main-page">
        <Header>
          <MainHeader />
        </Header>
        <div className="wrapper">
          <img src={logo} alt="Logo" className="App-logo" />

          <div id="area-busca" />
        </div>

        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
