import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import PageNumber from '../../PageNumber';

import './style.css';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.cardsPerPage = 4;
    this.state = {
      page: 1,
      cardPages: null,
      ready: false,
      maxPageNum: Math.ceil(props.cards.length / this.cardsPerPage),
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    this.setState({ ready: true, cardPages: this.makeCardPages(this.cardsPerPage) });
  }

  changePage = (page) => {
    this.setState({ page });
  };

  makeCardPages = (cardsPerPage) => {
    const { cards } = this.props;
    const { maxPageNum } = this.state;
    const matrixLen = maxPageNum;
    const result = Array(matrixLen);
    for (let index = 0, limit = result.length; index < limit; index += 1) {
      result[index] = [];
    }
    let i = -1;
    cards.forEach((element, index) => {
      const { info, url } = element;
      if (!(index % cardsPerPage)) {
        i += 1;
      }
      result[i].push(<Card key={Math.random()} info={info} url={url} />);
    });
    return result;
  };

  handlePage = (el) => {
    console.log(el.target.innerHTML);
  };

  render() {
    const {
      cardPages, ready, page, maxPageNum,
    } = this.state;
    return (
      <div className="deck-wrapper">
        <div ref={this.node} className="deck">
          {ready && cardPages[page - 1]}
        </div>
        <PageNumber handleClick={this.changePage} elementsPerPage={maxPageNum} />
      </div>
    );
  }
}

Deck.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      info: PropTypes.shape({ title: PropTypes.string, chamados: PropTypes.string }),
      url: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
