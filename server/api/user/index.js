'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.post('/', controller.create);
router.post('/password/request', controller.requestPasswordReset);
router.post('/password/reset', controller.resetPassword);
router.get('/password/verify-token', controller.verifyResetToken);


router.get('/me', auth.isAuthenticated(), controller.me);
router.patch('/me', auth.isAuthenticated(), controller.updateMyProfile);
router.get('/me/memberships', auth.isAuthenticated(), controller.myAccounts);
router.put('/me/password', auth.isAuthenticated(), controller.changePassword);

router.get('/', auth.hasGlobalRole('admin'), controller.index);
router.delete('/:userId', auth.hasGlobalRole('admin'), controller.destroy);
router.put('/:userId/role', auth.hasGlobalRole('admin'), controller.changeRole);

module.exports = router;
