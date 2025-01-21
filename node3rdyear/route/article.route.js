const express = require('express');
const router = express.Router();
const { findAll } = require('../model/article');

router.get('/getArticle', (req, res, next) => {
    findAll(req, res).catch(next);
});

module.exports = router;