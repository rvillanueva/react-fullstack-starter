import React from 'react';
import PropTypes from 'prop-types';
import {stopEvent} from '../../../utils/dom';

class DropdownOption extends React.Component {
  onClick = e => {
    if(this.props.onClick) {
      this.props.onClick();
    }
    if(this.props.stopClick) {
      stopEvent(e);
    }
  }
  render() {
    const {stopClick, onClick, ...rest} = this.props; //eslint-disable-line no-unused-vars
    return <div {...rest} onClick={this.onClick}>
      {this.props.children}
    </div>;
  }
}

DropdownOption.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  stopClick: PropTypes.bool
};

export default DropdownOption;
