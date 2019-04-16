import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo';

import './style.css';

export default class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  render() {
    const { animate } = this.state;
    return (
      <div className="not-found" style={{ opacity: animate ? 1 : 0 }}>
        <i className="far fa-frown fa-10x" />
        <h1>Página não encontrada!</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, veniam dignissimos quidem
          quod minima reiciendis doloribus nobis corrupti dolorem molestias consequuntur! Omnis ab
          doloremque cum? Consequatur itaque autem quia in!
        </p>
        <Link to="/">
          <Logo width="100" height="50" margin="2% auto" />
        </Link>
      </div>
    );
  }
}
