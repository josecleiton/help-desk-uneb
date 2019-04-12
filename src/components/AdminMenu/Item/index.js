import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default class AdminMenuItem extends Component {
  constructor() {
    super();
    this.state = {
      hasSubMenu: false,
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    const { submenu, currentpath, url } = this.props;
    const menuItemEl = this.node.current;
    if (submenu.length) {
      this.setState({ hasSubMenu: true });
    }
    if (currentpath() === url) {
      this.catEarEl = document.createElement('span');
      this.catEarEl.setAttribute('class', 'ear-right');

      menuItemEl.style.background = '#d81717';
      menuItemEl.style.fontWeight = '700';
      menuItemEl.appendChild(this.catEarEl);
    }
  }

  componentWillUnmount() {
    this.node.current.removeChild(this.catEarEl);
  }

  handleClick = (event) => {
    const { hasSubMenu } = this.state;
    if (hasSubMenu) {
      event.preventDefault();
    }
  };

  render() {
    const {
      icon, children, url, submenu,
    } = this.props;
    const { hasSubMenu } = this.state;
    const submenuLi = submenu.map(item => <li key={item}>{item}</li>);
    return (
      <Link to={url}>
        <li ref={this.node} className="menu-item">
          <span className="admin-menu-icon">
            <i className={icon} />
          </span>
          {children}
          {hasSubMenu ? <ul className="submenu">{submenuLi}</ul> : ''}
        </li>
        <hr className="line" />
      </Link>
    );
  }
}

AdminMenuItem.defaultProps = { icon: 'fas fa-home', submenu: [] };
AdminMenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  submenu: PropTypes.arrayOf(PropTypes.string),
  url: PropTypes.string.isRequired,
  currentpath: PropTypes.func.isRequired,
};
