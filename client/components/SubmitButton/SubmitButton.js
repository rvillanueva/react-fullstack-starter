import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loaders';
import './submit-button.scss';

export class SubmitButton extends React.Component {
  onClick(e) {
    if(this.props.onClick) this.props.onClick(e);
  }
  getClassName = () => {
    const {isSubmitting, className} = this.props;
    const buttonStyle = className
      ? className
      : 'btn btn-primary btn-submit';
    const submittingStyle = isSubmitting ? ' submitting' : '';
    return `${buttonStyle}${submittingStyle}`;
  }
  render() {
    const {isSubmitting, disabled} = this.props;
    return (
      <button
        className={this.getClassName()}
        type="submit"
        onClick={this.onClick.bind(this)}
        disabled={isSubmitting || disabled}
      >
        {
          isSubmitting === true
            ? <Loader className="btn-submit__loader" loaded={this.props.isSubmitting === true} type="ball-scale-ripple" />
            : null
        }
        <span className={`${isSubmitting ? 'btn-submit__text--hidden' : ''}`}>{this.props.value}</span>
      </button>
    );
  }
}

SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SubmitButton;
