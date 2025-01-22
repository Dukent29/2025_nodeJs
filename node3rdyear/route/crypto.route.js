const express = require('express');
const router = express.Router();
const { createCrypto } = require('../controller/crypto.controller');
//on peuveut specifie cors par route(means only for this route)
const cors = require('cors');

router.post('/createCrypto',cors(), createCrypto);

module.exports = router;