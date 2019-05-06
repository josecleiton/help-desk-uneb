import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

class AdminMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenu: null,
      highlight: false,
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;
    this.setState({ subMenu: this.fillSubMenu() });
    this.highlightMenu(pathname);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname: prevPathName },
    } = prevProps;
    const {
      location: { pathname },
    } = this.props;
    if (prevPathName !== pathname) {
      this.highlightMenu(pathname);
    }
  }

  makePathName = path => (path.length > 6 ? `/admin/${path.split('/')[2]}` : path);

  highlightMenu = (path) => {
    const { url } = this.props;
    this.setState({ highlight: this.makePathName(path) === url });
  };

  fillSubMenu = () => {
    const { submenu, url } = this.props;
    if (!submenu) return null;
    const submenuEl = submenu.map((element) => {
      const key = Object.keys(element)[0];
      const value = element[key];

      return (
        <li className="admin-submenu" key={key}>
          <NavLink
            exact
            key={`link-${key}`}
            to={`${url}/${key}`}
            className="admin-submenu-item"
            activeStyle={{ fontWeight: 'bolder', background: 'rgba(0,0,0,0.4)' }}
          >
            {value}
          </NavLink>
        </li>
      );
    });
    return <ul className="admin-submenu">{submenuEl}</ul>;
  };

  render() {
    const { icon, children, url } = this.props;
    const { subMenu, highlight } = this.state;
    return (
      <div>
        <li ref={this.node} className={highlight ? 'menu-item-highlighted' : 'menu-item'}>
          {highlight && <span className="ear-right" />}
          <NavLink exact to={url} activeStyle={{ fontWeight: 'bolder' }}>
            <nav>
              <span className="admin-menu-icon">
                <i className={icon} />
              </span>
              <span>{children}</span>
            </nav>
          </NavLink>
          {subMenu}
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
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(AdminMenuItem);
