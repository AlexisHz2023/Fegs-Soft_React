const express = require('express');
const router = express.Router();
const { ping } = require('../constrollers/pingController');
const { login } = require('../constrollers/loginControllers')


router.post('/login', login)

router.get('/ping', ping)


module.exports = router;