import React from 'react';

import MainHeader from '../../components/Main/Header';
import MenuChamado from '../../components/Main/MenuChamado';
import Footer from '../../components/Footer';

import './style.css';
import logo from '../../assets/logo.png';

const Main = () => (
  <div id="main-page">
    <MainHeader />
    <div className="wrapper">
      <img src={logo} alt="Logo" className="App-logo" />

      <div id="area-busca">
        <MenuChamado />
      </div>
    </div>

    <Footer />
  </div>
);

export default Main;
