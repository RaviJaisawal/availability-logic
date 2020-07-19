  
const express = require('express');
const router = express.Router();
const controller = require(`../controller`);
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.post('/',controller.user.post);


module.exports = router;