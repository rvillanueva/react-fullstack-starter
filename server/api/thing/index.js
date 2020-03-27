'use strict';

import {Router} from 'express';
import * as controller from './thing.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:thingId', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.patch('/:thingId', auth.hasAccountRole('admin'), controller.patch);
router.delete('/:thingId', auth.hasGlobalRole('admin'), controller.destroy);

module.exports = router;
