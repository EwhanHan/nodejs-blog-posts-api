const express = require('express');
const pingController = require('../Controller/pingController');

const router = express.Router();

router.get('/ping', pingController.getPing);

module.exports = router;
