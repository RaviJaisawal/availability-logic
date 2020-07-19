  
const express = require('express');
const router = express.Router();
const controller = require(`../controller`);
const bodyParser = require('body-parser');
const { checkUserExits } = require('../controller/user')

router.use(bodyParser.json());


router.get('/',controller.availability.get);
router.post('/',checkUserExits,controller.availability.getAllTRecordsBetweenStartEnd)


module.exports = router;