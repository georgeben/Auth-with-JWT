const express = require('express');

const router = express.Router();
const userContoller = require('./v1/users/userController');

router.use(('/users', userContoller));

module.exports = router;
