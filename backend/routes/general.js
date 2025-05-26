const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const{login}  = require('../controller/general.js');

router.post('/login',login );

module.exports = router;