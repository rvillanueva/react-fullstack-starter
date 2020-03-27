import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect
} from 'react-router-dom';
import querystring from 'querystring';

const PrivateRouteContainer = ({children, isAuthorized, redirectTo, withParams}) => {
  const {pathname, search} = window.location;
  const redirect = `${pathname}${search}`;
  if(isAuthorized) {
    return children;
  } else if(withParams && redirect !== '/') {
    const qs = querystring.stringify({ redirect });
    return <Redirect to={`${redirectTo}?${qs}`} />;
  } else {
    return <Redirect to={redirectTo} />;
  }
};

PrivateRouteContainer.propTypes = {
  children: PropTypes.any,
  isAuthorized: PropTypes.bool,
  redirectTo: PropTypes.string,
  withParams: PropTypes.bool
};

export default PrivateRouteContainer;
