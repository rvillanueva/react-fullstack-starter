import React from 'react';
import PropTypes from 'prop-types';
import './alerts.scss';

class AlertCard extends React.Component {
  render() {
    const {message, type} = this.props;
    if(!message) {
      return null;
    } else {
      return <div className={`alert-card alert-card--${type}`}>{message}</div>;
    }
  }
}

AlertCard.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default AlertCard;
