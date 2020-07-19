"use strict";

const express =  require('express');
const router =  express.Router();
const { checkUserExits } = require('../controller/user')

router.use('/availability',require('./availability'));
router.use('/user',require('./user'));


module.exports = router;