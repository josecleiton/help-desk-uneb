import React, { Component } from 'react';
import Form from '../../components/Form';
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
        <Form />
        <Footer />
      </div>
    );
  }
}