import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

// Since this component is simple and static, there's no parent container for it.
class Navbar extends React.Component {
  render(){
    const activeStyle = { color: 'blue' };
    var login;
    var name;
    if(!this.props.auth.user || !this.props.auth.user._id){
      login = <NavLink to="/login" activeClassName="active">Login</NavLink>
    } else {
      name = this.props.auth.user.name
    }
    return (
      <div className="navbar">
        <div className="container">
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/fuel-savings" activeClassName="active">Demo App</NavLink>
          <NavLink to="/about" activeClassName="active">About</NavLink>
          {login}{name}
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

export default connect(
  mapStateToProps
)(Navbar);
