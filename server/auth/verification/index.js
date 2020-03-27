'use strict';

import express from 'express';
import * as controller from './verification.controller';

var router = express.Router();

router.get('/', controller.verifyEmail);

export default router;
