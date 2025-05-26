const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const{login,getdetails}  = require('../controller/general.js');

router.post('/login',login );
router.post("/details",getdetails)

module.exports = router;