import React from 'react';
import PropTypes from 'prop-types';
import './error-boundary.scss';
import * as Sentry from '@sentry/browser';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(err, errorInfo) {
    if(process.env.SENTRY_DSN_FRONTEND) {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(err);
      });
    } else {
      console.error(err, errorInfo);
    }
    this.setState({
      hasError: true
    });
  }
  render() {
    if(this.state.hasError) {
      return <div className="error-boundary-page">
        Sorry, something went wrong and it has been reported. Please try again.
      </div>;
    }
    return this.props.children;
  }
}

Avatar.propTypes = {
  children: PropTypes.any.isRequired
};
