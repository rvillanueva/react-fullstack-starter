import React from 'react';
import PropTypes from 'prop-types';
import {stopEvent} from '../../../utils/dom';

export default class DropdownTrigger extends React.Component {
  onClick = e => {
    if(this.props.onClick) {
      this.props.onClick();
    }
    if(this.props.stopClick) {
      stopEvent(e);
    }
  }
  render() {
    const {className, setRef, stopClick, onClick, ...rest} = this.props; //eslint-disable-line no-unused-vars
    const compoundClassName = className ? ` ${className}` : '';
    return (
      <div className={`dropdown__trigger${compoundClassName}`} ref={setRef} onClick={this.onClick} {...rest}>
        {this.props.children}
      </div>
    );
  }
}

DropdownTrigger.propTypes = {
  onClick: PropTypes.func,
  setRef: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  stopClick: PropTypes.bool
};
