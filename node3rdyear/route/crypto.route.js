const express = require('express');
const router = express.Router();
const { createCrypto } = require('../controller/crypto.controller');

router.post('/createCrypto', createCrypto);

module.exports = router;