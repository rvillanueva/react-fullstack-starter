import React from 'react';
import PropTypes from 'prop-types';
import './dropdown.scss';
import DropdownTrigger from './components/DropdownTrigger';
import DropdownContent from './components/DropdownContent';
import DropdownOption from './components/DropdownOption';
import {isInstanceOfComponent} from '../../utils/type';

export class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      contentStyle: {}
    };
    this.triggerRef = null;
    this.contentRef = null;
    this.documentMousedownListener;
  }

  onTriggerClick() {
    this.setVisibility(!this.state.isOpen);
  }

  setVisibility(bool) {
    this.setState({isOpen: bool});
    bool ? this.addMousedownListener() : this.removeMousedownListener();
  }

  addMousedownListener() {
    this.documentMousedownListener = this.handleClickOutside.bind(this);
    document.addEventListener('mousedown', this.documentMousedownListener);
  }

  removeMousedownListener() {
    document.removeEventListener('mousedown', this.documentMousedownListener);
  }

  componentWillUnmount() {
    this.removeMousedownListener();
  }

  handleClickOutside(e) {
    if(
      !(this.triggerRef && this.triggerRef.contains(e.target))
      && !(this.contentRef && this.contentRef.contains(e.target))
    ) {
      this.setVisibility(false);
    }
  }
  setTriggerRef(node) {
    this.triggerRef = node;
  }
  setContentRef(node) {
    this.contentRef = node;
  }
  render() {
    var children = React.Children.map(this.props.children, child => {
      if(!child) {
        return child;
      }
      if(isInstanceOfComponent(child, DropdownTrigger)) {
        return React.cloneElement(child, {
          onClick: this.onTriggerClick.bind(this),
          setRef: this.setTriggerRef.bind(this)
        });
      } else if(isInstanceOfComponent(child, DropdownContent)) {
        return React.cloneElement(child, {
          setRef: this.setContentRef.bind(this),
          isVisible: this.state.isOpen,
          setVisibility: this.setVisibility.bind(this),
          handleClickOutside: this.handleClickOutside.bind(this),
          style: this.state.contentStyle
        });
      } else if(isInstanceOfComponent(child, DropdownOption)) {
        return null;
      } else {
        return child;
      }
    });
    const isActive = this.state.isOpen ? ' active' : '';
    return (
      <div className={`dropdown ${this.props.className || ''}${isActive}`} ref={this.setWrapperRef}>
        {children}
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export DropdownTrigger from './components/DropdownTrigger';
export DropdownContent from './components/DropdownContent';
export DropdownOption from './components/DropdownOption';
