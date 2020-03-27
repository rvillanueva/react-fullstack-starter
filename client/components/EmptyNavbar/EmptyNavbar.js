import React from 'react';
import './empty-navbar.scss';
import logo from '../../assets/nav-logo.png';

// Since this component is simple and static, there's no parent container for it.
class EmptyNavbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-group-left">
          <div className="navbar__logo__container">
            <img className="navbar__logo" src={logo} />
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyNavbar;
