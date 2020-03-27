'use strict';
import express from 'express';
import config from '../config/environment';
import verification from './verification';
import {User} from '../sqldb';
// Passport Configuration

require('./local/local.passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);
router.use('/verification', verification);

export default router;
