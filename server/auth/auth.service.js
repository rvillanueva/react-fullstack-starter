'use strict';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import {User, sequelize} from '../sqldb';
import {escape} from 'sqlstring';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

export function attachUser() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      } else if(req.query && typeof req.headers.authorization === 'undefined') {
        // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
        req.headers.authorization = `Bearer ${req.cookies.token}`;
      }
      validateJwt(req, res, async function(e) {
        if(!e && req.user && req.user._id) {
          req.user = await User.findOne({
            where: {
              _id: req.user._id,
            },
            attributes: ['_id', 'name', 'role']
          });
        } else {
          Reflect.deleteProperty(req, 'user'); // Ignore error since authentication forbidding handled later
        }
        return next();
      });
    })
    // Attach user to request
    .use(async function(req, res, next) {
      return next();
    });
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    .use(attachUser())
    .use(async function(req, res, next) {
      if(!req.user) return res.status(401).end();
      return next();
    })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasGlobalRole(roleRequired) {
  if(!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        return next();
      } else {
        return res.status(403).send('Forbidden');
      }
    });
}


export function hasAccountRole(roleRequired, options) {
  options = options || {};
  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      let {accountId} = req.params;
      if(!accountId && options.useQueryParams) {
        accountId = req.query.accountId;
      }
      if(!accountId) return res.status(400).send('Invalid account id.');
      const relevantMembership = req.permissions.filter(permission => permission.accountId === accountId)[0] || {};
      const relevantRole = relevantMembership.role;
      const isAuthorized = relevantRole && config.userRoles.indexOf(relevantRole) >= config.userRoles.indexOf(roleRequired);
      return isAuthorized ? next(null) : res.status(401).end();
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 24 * 7 // one week
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if(!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
}
