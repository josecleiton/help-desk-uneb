import React, { Component } from 'react';
import AbrirChamadoForm from '../../components/AbrirChamado/Form';
import Header from '../../components/Header';
import MainHeader from '../../components/Main/Header';
import Footer from '../../components/Footer';

export default class AbrirChamado extends Component {
  render() {
    return (
      <div>
        <Header>
          <MainHeader />
        </Header>
        <AbrirChamadoForm />
        <Footer />
      </div>
    );
  }
}
