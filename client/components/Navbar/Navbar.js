import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../../actions/authActions';
import {bindActionCreators} from 'redux';
import './navbar.scss';
import logo from '../../assets/nav-logo.png';
import SettingsMenu from './components/SettingsMenu';

// Since this component is simple and static, there's no parent container for it.
class Navbar extends React.Component {
  render() {
    var login;
    var isLoggedIn = !!this.props.auth.user;
    return (
      <div className="navbar">
        <div className="navbar-group-left">
          <Link className="navbar__logo__container dropdown__option" to="/">
            <img className="navbar__logo" src={logo} />
          </Link>
        </div>
        <div className="navbar-group-center navbar__link__container">
          <Link to="/customers" className="unstyled-link navbar__link">
            Customers
          </Link>
          <Link to="/payments" className="unstyled-link navbar__link">
            Payments
          </Link>
          <Link to="/settings" className="unstyled-link navbar__link">
            Settings
          </Link>
        </div>
        <div className="navbar-group-right">
          <div className="pseudo-full-height" />
          {isLoggedIn ? <SettingsMenu /> : login}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
