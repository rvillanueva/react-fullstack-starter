import React from 'react';
import PropTypes from 'prop-types';
import NavDropdownContent from './NavDropdownContent';

export default class NavDropdown extends React.Component {
  constructor(){
    super();
    this.state = {
      isOpen: false
    }
  }
  onClick(){
    this.setVisibility(!this.state.isOpen);
  }

  setVisibility(bool){
    this.setState({isOpen: bool});
  }

  render(){
    return (
      <div className="nav-dropdown" ref={this.setWrapperRef}>
        <div className="nav-dropdown-trigger" onClick={this.onClick.bind(this)}>Options</div>
        <div className={this.state.isOpen ? '' : 'hidden'}>
          <NavDropdownContent setVisibility={this.setVisibility.bind(this)} />
        </div>
      </div>
    );
  }
}
