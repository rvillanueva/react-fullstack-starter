import React from 'react';
import PropTypes from 'prop-types';

export default class PaymentDatePicker extends React.Component {
  render() {
    const text = this.props.value || 'Immediately';
    return <a onClick={this.props.onClick}>{text}</a>;
  }
}

PaymentDatePicker.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};
