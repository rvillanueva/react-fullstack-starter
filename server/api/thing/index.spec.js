'use strict';

/* globals sinon, describe, expect, it */

function mockThingCtrl(){
  console.log('using thing mock!')
  return {
    index: 'thingCtrl.index',
    show: 'thingCtrl.show',
    create: 'thingCtrl.create',
    upsert: 'thingCtrl.upsert',
    patch: 'thingCtrl.patch',
    destroy: 'thingCtrl.destroy'
  }
};

function mockRouter(){
  return {
    Router(){
      console.log('using mock!')
      return {
        get: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        post: jest.fn(),
        delete: jest.fn()
      }
    }
  }
};

// require the index with our stubbed out modules
jest.mock('express', () => mockRouter());
jest.mock('./index.js', () => mockThingCtrl());

var thingIndex = require('./index.js');

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(thingIndex).toEqual(mockThingCtrl());
  });
/*
  describe('GET /api/things', function() {
    it('should route to thing.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'thingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/things/:id', function() {
    it('should route to thing.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'thingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/things', function() {
    it('should route to thing.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'thingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/things/:id', function() {
    it('should route to thing.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'thingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/things/:id', function() {
    it('should route to thing.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'thingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/things/:id', function() {
    it('should route to thing.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'thingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });*/
});
