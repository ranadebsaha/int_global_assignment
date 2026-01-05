const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');


router.post('/classify', Controller.classifyText);

module.exports = router;