import React from 'react';
import PropTypes from 'prop-types';
import DropdownOption from './DropdownOption';
import {isInstanceOfComponent} from '../../../utils/type';
import mapAllReactChildren from '../../../utils/mapAllReactChildren';
import {positionWithinWindow} from '../../../utils/bounding';

class DropdownContent extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {},
      loaded: false
    };
    this.myRef = null;
    // TODO Add resize listener. Need to recalculate bounding style on window resize.
  }
  setBoundingStyle(node) {
    const style = positionWithinWindow(node);
    this.setState({
      style,
      loaded: true
    });
  }
  setRefs(node) {
    if(!this.state.loaded) {
      this.setBoundingStyle(node);
    }
    if(this.props.setRef) {
      this.props.setRef(node);
    }
  }
  transformChild(child) {
    if(child && isInstanceOfComponent(child, DropdownOption)) {
      return React.cloneElement(child, Object.assign({}, child.props, {
        onClick: () => {
          if(typeof child.props.onClick === 'function') {
            child.props.onClick();
          }
          this.props.setVisibility(false);
        }
      }));
    }
    return child;
  }
  render() {
    if(!this.props.isVisible) {
      return null;
    }
    var children = mapAllReactChildren(this.props.children, this.transformChild.bind(this));
    return <div
      className={`dropdown__content ${this.props.className || ''}`}
      style={this.state.style}
      ref={this.setRefs.bind(this)}
    >
      {children}
    </div>;
  }
}

// TODO should required injected props, but currently throws error
DropdownContent.propTypes = {
  setRef: PropTypes.func,
  children: PropTypes.any,
  isVisible: PropTypes.bool,
  setVisibility: PropTypes.func,
  handleClickOutside: PropTypes.func,
  className: PropTypes.string
};

export default DropdownContent;
