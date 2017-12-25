import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/authActions';
import {bindActionCreators} from 'redux';

class NavDropdownContent extends React.Component {
  constructor(){
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  logout(){
    this.props.authActions.logout();
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
      this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.setVisibility(false);
      }
  }

  render(){
    return (
      <div className="nav-dropdown-content" ref={this.setWrapperRef}>
          <NavLink to='/settings'>Settings</NavLink>
          <br />
          <a href="#" onClick={this.logout.bind(this)}>Logout</a>
      </div>
    );
  }
}

NavDropdownContent.propTypes = {
  authActions: PropTypes.object.isRequired,
  setVisibility: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavDropdownContent);
