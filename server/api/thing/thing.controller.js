/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/businesses              ->  index
 * POST    /api/businesses              ->  create
 * GET     /api/accounts/:id          ->  show
 * PUT     /api/accounts/:id          ->  upsert
 * PATCH   /api/accounts/:id          ->  patch
 * DELETE  /api/accounts/:id          ->  destroy
 */

'use strict';

import {Thing} from '../../sqldb';
import {applyPatch} from '../../utils/patch';

export function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return res.status(statusCode).end();
  };
}

export function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

export function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
export async function index(req, res, next) {
  try {
    const things = await Thing.findAll({
      where: {}
    });
    return res.status(200).json(things);
  } catch(err) {
    return next(err);
  }
}

// Gets a single Business from the DB
export async function show(req, res, next) {
  try {
    const {thingId} = req.params;
    const thing = await Thing.findOne({
      where: {
        _id: thingId
      }
    });
    if(!thing) return res.status(403).end();
    return res.status(200).json({
      thing
    });
  } catch(err) {
    return next(err);
  }
}

// Creates a new Business in the DB
export async function create(req, res, next) {
  try {
    const thing = await Thing.create(req.body);
    return res.status(200).json({
      thing
    });
  } catch(e) {
    return next(e);
  }
}

// Updates an existing Business in the DB
export async function patch(req, res, next) {
  try {
    const thing = await Thing.findOne({
      where: {
        _id: req.params.thingId
      }
    });
    applyPatch(thing, req.body);
    await thing.save();
    return res.status(200).json(thing);
  } catch(e) {
    return next(e);
  }
}


// Deletes a Business from the DB
export async function destroy(req, res, next) {
  try {
    const {thingId} = req.params;
    const thing = await Thing.findOne({
      where: {
        _id: thingId
      }
    });
    if(!thing) return res.status(403).end();
    await thing.destroy();
    return res.status(200).end();
  } catch(e) {
    return next(e);
  }
}
