import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default class AdminMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSubMenu: false,
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    const { submenu, currentpath, url } = this.props;
    const menuItemEl = this.node.current;
    if (submenu.length) {
      this.setState({ hasSubMenu: true }, this.fillSubMenu());
    }
    if (currentpath() === url) {
      this.catEarEl = document.createElement('span');
      this.catEarEl.setAttribute('class', 'ear-right');

      menuItemEl.style.background = '#d81717';
      menuItemEl.appendChild(this.catEarEl);
    }
  }

  handleClick = (event) => {
    const { hasSubMenu } = this.state;
    if (hasSubMenu) {
      event.preventDefault();
    }
  };

  fillSubMenu = () => {
    const { submenu, url } = this.props;
    this.subMenu = submenu.map((element) => {
      const key = Object.keys(element)[0];
      const value = element[key];

      return (
        <li className="admin-submenu" key={key}>
          <NavLink
            exact
            key={`link-${key}`}
            to={`${url}/${key}`}
            className="admin-submenu-item"
            activeStyle={{ fontWeight: 'bolder' }}
          >
            {value}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    const { icon, children, url } = this.props;
    const { hasSubMenu } = this.state;
    // const submenuLi = submenu.map(item => <li key={item}>{item}</li>);
    return (
      <div>
        <li ref={this.node} className="menu-item">
          <NavLink exact to={url} activeStyle={{ fontWeight: 'bolder' }}>
            <nav>
              <span className="admin-menu-icon">
                <i className={icon} />
              </span>
              <span>{children}</span>
            </nav>
          </NavLink>
          {hasSubMenu ? <ul className="admin-submenu">{this.subMenu}</ul> : ''}
        </li>
        <hr className="line" />
      </div>
    );
  }
}

AdminMenuItem.defaultProps = { icon: 'fas fa-home', submenu: [] };
AdminMenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  submenu: PropTypes.arrayOf(PropTypes.object),
  url: PropTypes.string.isRequired,
  currentpath: PropTypes.func.isRequired,
};
