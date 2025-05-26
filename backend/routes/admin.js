const {register_user}=require("../controller/admin")
const express = require('express');
const router = express.Router();
router.post('/add_users', register_user);
module.exports = router;