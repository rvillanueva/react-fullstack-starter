import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
  Route
} from 'react-router-dom';
import querystring from 'querystring';

class PrivateRoute extends React.Component {
  render() {
    const {component, isAuthorized, redirectTo, withParams, ...rest} = this.props;
    if(isAuthorized) {
      return <Route {...rest} component={component} />;
    } else {
      return <Route {...rest} render = {() => {
        if(withParams) {
          const {pathname, search} = window.location;
          const qs = querystring.stringify({ redirect: `${pathname}${search}` });
          return <Redirect to={`${redirectTo}?${qs}`} />;
        } else {
          return <Redirect to={redirectTo} />;
        }
      }} />;
    }
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isAuthorized: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
  withParams: PropTypes.bool
};

export default PrivateRoute;
