import React from 'react';
import './options-button.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const OptionsButton = ({className}) =>
  <div className={`options-button${className ? ` ${className}` : ''}`}>
    <div>
      <FontAwesomeIcon className="options-button__icon" icon={['far', 'ellipsis-v']} />
    </div>
  </div>;

OptionsButton.propTypes = {
  className: PropTypes.string,
};

export default OptionsButton;
