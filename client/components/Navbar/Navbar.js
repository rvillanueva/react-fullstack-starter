import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/authActions';
import {bindActionCreators} from 'redux';
import NavDropdown from './NavDropdown';
import './navbar.scss';

// Since this component is simple and static, there's no parent container for it.
class Navbar extends React.Component {
  render(){
    const activeStyle = { color: 'blue' };
    var login;
    var name;
    var admin;
    var dropdown;

    if(!this.props.auth.user._id){
      login = <NavLink to="/login" className="navbar-item" activeClassName="active">Login</NavLink>
    } else {
      name = <div className="navbar-user navbar-item">{this.props.auth.user.name}</div>
      if(this.props.auth.user.role === 'admin'){
        admin = <NavLink to="/admin" className="navbar-item" activeClassName="active">Admin</NavLink>
      }
      dropdown = <NavDropdown />
    }
    return (
      <div className="navbar">
        <div className="container">
          <NavLink exact to="/" className="navbar-item" activeClassName="active">Home</NavLink>
          <NavLink to="/fuel-savings" className="navbar-item" activeClassName="active">Demo</NavLink>
          <NavLink to="/things" className="navbar-item" activeClassName="active">Things</NavLink>
          {admin}
          <div className="pull-right">
            {login}
            {name}
            {dropdown}
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    pathname: state.routing.location.pathname,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
