const express = require('express');
const router = express.Router();
const { findAll, create } = require('../controller/presentation.controller');

router.get('/getPresentations', (req, res, next) => {
    findAll(req, res, next);
});

router.post('/createPresentation', (req, res, next) => {
    create(req, res, next);
});

module.exports = router;