import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class ModalCloseButton extends React.Component {
  render() {
    return <button type="button" className="modal__close-button" onClick={this.props.onClose}>
      <FontAwesomeIcon className="modal__close-button__icon" icon={['far', 'times']} />
    </button>;
  }
}

ModalCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired
};
