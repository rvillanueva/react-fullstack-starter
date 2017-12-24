import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/authActions';
import {bindActionCreators} from 'redux';

class NavDropdown extends React.Component {
  constructor(){
    super();
    this.state = {
      isOpen: false
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  onClick(){
    this.setState({isOpen: !this.state.isOpen});
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
        this.setState({isOpen: false});
      }
  }

  render(){
    var dropdownClass = `nav-dropdown-content ${this.state.isOpen ? '' : 'hidden'}`;
    return (
      <div className="nav-dropdown" ref={this.setWrapperRef}>
        <div className="nav-dropdown-trigger" onClick={this.onClick.bind(this)}>Options</div>
        <div className={dropdownClass}>
          <a href="#" onClick={this.logout.bind(this)}>Logout</a>
        </div>
      </div>
    );
  }
}

NavDropdown.propTypes = {
  authActions: PropTypes.object.isRequired,
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
)(NavDropdown);
